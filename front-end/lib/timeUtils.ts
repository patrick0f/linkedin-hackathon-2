import { userService } from '../services/api';

export interface TimeRange {
  start: number;
  end: number;
}

export interface DayTimeSlot {
  day: number;  // 0-6 for Monday-Sunday
  time: string; // e.g. "12:00 PM"
}

interface User {
  id: string;
  time_avail?: number[];
}

/**
 * Converts a day and time to continuous hour count
 * Monday 00:00 = 0
 * Monday 23:59 = 23.99
 * Tuesday 00:00 = 24
 * etc.
 */
export function toContinuousHours(dayIndex: number, timeString: string): number {
  const baseHours = dayIndex * 24; // Each day adds 24 hours
  
  // Parse the time string (e.g. "12:00 PM")
  const [time, period] = timeString.split(' ');
  const [hourStr, minuteStr] = time.split(':');
  let hour = parseInt(hourStr);
  const minutes = parseInt(minuteStr);

  // Convert to 24-hour format
  if (period === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period === 'AM' && hour === 12) {
    hour = 0;
  }

  // Calculate continuous hours
  return baseHours + hour + (minutes / 60);
}

/**
 * Converts continuous hours back to day and time
 * @param continuousHours - Number of hours since Monday 00:00
 * @returns Object with day index and formatted time string
 */
export function fromContinuousHours(continuousHours: number): DayTimeSlot {
  const day = Math.floor(continuousHours / 24);
  const remainingHours = continuousHours % 24;
  
  let hour = Math.floor(remainingHours);
  const minutes = Math.round((remainingHours - hour) * 60);
  
  // Convert to 12-hour format
  const period = hour >= 12 ? 'PM' : 'AM';
  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }
  
  const timeString = `${hour}:${minutes.toString().padStart(2, '0')} ${period}`;
  
  return {
    day,
    time: timeString
  };
}

/**
 * Converts availability object to array of continuous hours
 * @param availability - Object with day indices as keys and arrays of time strings as values
 * @returns Array of continuous hour values
 */
export function availabilityToContinuousHours(
  availability: { [key: number]: string[] }
): number[] {
  const hours: number[] = [];
  
  for (const [dayStr, times] of Object.entries(availability)) {
    const day = parseInt(dayStr);
    for (const time of times) {
      const continuousHour = toContinuousHours(day, time);
      hours.push(continuousHour);
    }
  }
  
  return hours.sort((a, b) => a - b);
}

/**
 * Finds matching times between two arrays of continuous hours
 * @returns Array of matching continuous hour values
 */
export function findMatchingTimes(
  times1: number[],
  times2: number[]
): number[] {
  const matches: number[] = [];
  const set2 = new Set(times2);
  
  for (const time of times1) {
    if (set2.has(time)) {
      matches.push(time);
    }
  }
  
  return matches.sort((a, b) => a - b);
}

/**
 * Finds overlapping time slots between two arrays of continuous hour ranges
 */
export function findOverlappingTimes(
  times1: TimeRange[],
  times2: TimeRange[]
): TimeRange[] {
  const overlaps: TimeRange[] = [];
  
  for (const t1 of times1) {
    for (const t2 of times2) {
      const start = Math.max(t1.start, t2.start);
      const end = Math.min(t1.end, t2.end);
      
      if (start < end) {
        overlaps.push({ start, end });
      }
    }
  }
  
  return overlaps;
}

/**
 * Converts availability object to continuous hour ranges
 * @param availability - Object with day indices as keys and arrays of time strings as values
 */
export function availabilityToContinuousRanges(
  availability: { [key: number]: string[] }
): TimeRange[] {
  const ranges: TimeRange[] = [];
  
  for (const [dayStr, times] of Object.entries(availability)) {
    const day = parseInt(dayStr);
    for (const time of times) {
      // Assume each slot is 30 minutes
      const startHour = toContinuousHours(day, time);
      const endHour = startHour + 0.5; // 30 minutes = 0.5 hours
      ranges.push({
        start: startHour,
        end: endHour
      });
    }
  }
  
  return ranges;
}

/**
 * Saves user's availability to the database
 * @param userId - The user's ID
 * @param availability - Object with day indices as keys and arrays of time strings as values
 */
export async function saveUserAvailability(
  userId: string,
  availability: { [key: number]: string[] }
): Promise<void> {
  try {
    // Convert the availability object to continuous hours
    const continuousHours = availabilityToContinuousHours(availability);
    
    // Update the user's time_avail in the database with the float array
    await userService.updateUser(userId, {
      time_avail: continuousHours
    });
  } catch (error) {
    console.error('Error saving availability:', error);
    throw error;
  }
}

/**
 * Gets users who have matching availability times
 * @param timeSlots - Array of continuous hour values to match against
 * @param currentUserId - ID of the current user to exclude from results
 * @returns Array of user IDs who have matching availability
 */
export async function getUsersWithMatchingTimes(timeSlots: number[], currentUserId: string): Promise<string[]> {
  try {
    // Get all users
    const users = await userService.getAllUsers();
    
    // Convert timeSlots to a Set for faster lookup
    const targetTimes = new Set(timeSlots);
    
    // Filter users who have at least one matching time slot and exclude current user
    const matchingUsers = users
      .filter((user: User) => 
        user.id !== currentUserId && 
        user.time_avail && 
        user.time_avail.some((time: number) => targetTimes.has(time))
      )
      .map((user: User) => user.id);
    
    return matchingUsers;
  } catch (error) {
    console.error('Error getting users with matching times:', error);
    throw error;
  }
}

/**
 * Gets the actual overlapping time slots between current user and another user
 * @param currentUserAvailability - Current user's availability in continuous hours
 * @param otherUserAvailability - Other user's availability in continuous hours
 * @returns Array of overlapping time slots with day and time information
 */
export function getOverlappingTimeSlots(
  currentUserAvailability: number[],
  otherUserAvailability: number[]
): DayTimeSlot[] {
  // Find matching times
  const matchingTimes = findMatchingTimes(currentUserAvailability, otherUserAvailability);
  
  // Convert back to day and time format
  const overlappingSlots = matchingTimes.map(time => fromContinuousHours(time));
  
  return overlappingSlots.sort((a, b) => {
    // Sort by day first, then by time
    if (a.day !== b.day) {
      return a.day - b.day;
    }
    // Convert time to 24-hour format for comparison
    const timeA = toContinuousHours(a.day, a.time);
    const timeB = toContinuousHours(b.day, b.time);
    return timeA - timeB;
  });
}

/**
 * Converts overlapping time slots to a format suitable for the scheduler
 * @param overlappingSlots - Array of overlapping time slots
 * @returns Object with dates as keys and arrays of time slots as values
 */
export function formatOverlappingSlotsForScheduler(overlappingSlots: DayTimeSlot[]): { [date: string]: string[] } {
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const formattedSlots: { [date: string]: string[] } = {};
  
  overlappingSlots.forEach(slot => {
    const dayName = dayNames[slot.day];
    if (!formattedSlots[dayName]) {
      formattedSlots[dayName] = [];
    }
    formattedSlots[dayName].push(slot.time);
  });
  
  return formattedSlots;
} 