import { site } from '@/data/site';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** "23:00" -> "11 PM", "11:30" -> "11:30 AM", "00:00" -> "12 AM" */
export function formatTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 && h < 24 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour12}:${String(m).padStart(2, '0')} ${suffix}` : `${hour12} ${suffix}`;
}

/** Day index (0 = Sunday) and minutes since midnight in the restaurant's time zone. */
function localNow(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

function slotsFor(day, hours) {
  return hours.filter((h) => h.days.includes(day));
}

/**
 * Live open/closed status. Handles slots that run past midnight
 * (e.g. 12:00 -> 00:30) by checking yesterday's late slot too.
 */
export function getOpenStatus(date = new Date(), hours = site.hours, timeZone = site.timeZone) {
  const { day, minutes } = localNow(date, timeZone);
  const yesterday = (day + 6) % 7;

  for (const slot of slotsFor(day, hours)) {
    const open = toMinutes(slot.opens);
    const close = toMinutes(slot.closes);
    const inside = close > open ? minutes >= open && minutes < close : minutes >= open;
    if (inside) return { isOpen: true, closesAt: formatTime(slot.closes), soon: close > open && close - minutes <= 45 };
  }
  for (const slot of slotsFor(yesterday, hours)) {
    const open = toMinutes(slot.opens);
    const close = toMinutes(slot.closes);
    if (close <= open && minutes < close) return { isOpen: true, closesAt: formatTime(slot.closes), soon: close - minutes <= 45 };
  }

  // Closed: find the next opening in the coming week.
  for (let offset = 0; offset < 8; offset++) {
    const d = (day + offset) % 7;
    const upcoming = slotsFor(d, hours)
      .map((s) => toMinutes(s.opens))
      .filter((open) => offset > 0 || open > minutes)
      .sort((a, b) => a - b);
    if (upcoming.length) {
      const opens = `${String(Math.floor(upcoming[0] / 60)).padStart(2, '0')}:${String(upcoming[0] % 60).padStart(2, '0')}`;
      const when = offset === 0 ? 'today' : offset === 1 ? 'tomorrow' : DAY_NAMES[d];
      return { isOpen: false, opensAt: formatTime(opens), opensWhen: when };
    }
  }
  return { isOpen: false };
}

/** Human summary such as "Open daily · 11 AM – 11 PM". */
export function hoursSummary(hours = site.hours) {
  if (hours.length === 1 && hours[0].days.length === 7) {
    return `Open daily · ${formatTime(hours[0].opens)} – ${formatTime(hours[0].closes)}`;
  }
  return hours
    .map((h) => `${h.days.map((d) => DAY_NAMES[d].slice(0, 3)).join(', ')} · ${formatTime(h.opens)} – ${formatTime(h.closes)}`)
    .join(' | ');
}

/** schema.org OpeningHoursSpecification for structured data. */
export function openingHoursSpecification(hours = site.hours) {
  return hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days.map((d) => `https://schema.org/${DAY_NAMES[d]}`),
    opens: h.opens,
    closes: h.closes,
  }));
}
