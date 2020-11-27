import { format } from "date-fns";

/**
 * Create an element with attributes and events, and append elements or
 * strings to it.
 *
 * Usage:
 *  const el = element(
 *    'button',
 *    { 'class': 'button' },
 *    { click: () => { ... } },
 *    'Takki'
 *   );
 *  returns
 *  <button class="button">Takki</button> with a click handler.
 *
 * @param {string} name Element name
 * @param {object} attributes Object containing attributes to attach to element.
 * @param {object} events Object of events to add to element.
 * @param  {...any} children List of elements or strings to append to element.
 * @returns {object} HTML element.
 */
export function element(name, attributes = null, events = null,...children) {
  const el = document.createElement(name);

  for (const child of children) {
    if (!child) {
      continue;
    }

    if (attributes) {
      for (const attrib in attributes) {
        el.setAttribute(attrib, attributes[attrib]);
      }
    }

    if (events) {
      for (const event in events) {
        el.addEventListener(event, events[event]);
      }
    }

    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  }

  return el;
}

/**
 * Simplified element function.
 * Creates an element and append elements or strings to it.
 *
 * @param {string} name Element name
 * @param  {...any} children List of elements or strings to append to element.
 * @returns {object} HTML element.
 */
export function el(name, ...children) {
  return element(name, null, null, ...children);
}

// Function which returns duration of video
// as a string formated as HH:MM.
export function formatLength(timestamp) {
  timestamp = parseInt(timestamp);
  let MM = 0;
  let SS = 0;
  if(timestamp < 60){
    MM = 0;
    SS = timestamp;
    if(SS < 10){
      SS = '0' + SS;
    }
  }else{
    MM = Math.floor(timestamp / 60);
    timestamp = timestamp - MM * 60;
    SS = timestamp;
    if(SS < 10){
      SS = '0' + SS;
    }
  }
  return MM + ':' + SS;
}

// Function which compares video time stamp
// to current time and returns appropriate string
// describing how much time has passed since the video
// was uploaded
export function videoAge(timestamp){
  let date = new Date(timestamp);
  let now = new Date();
  const diffInMinutes = (now - date) / (1000 * 60);

  // 525,600 minutes in a year
  // 60*24*30 minutues in a month etc.
  if(diffInMinutes > 525600){
    let diff = Math.round(diffInMinutes / 525600)
    if(diff > 1){
      return 'Fyrir ' + diff + ' árum síðan';
    }else{
      return 'Fyrir 1 ári síðan'
    }
  }else if (diffInMinutes > 43200){
    let diff = Math.round(diffInMinutes / 43200)
    if(diff > 1){
      return 'Fyrir ' + diff + ' mánuðum síðan';
    }else{
      return 'Fyrir 1 mánuði síðan'
    }
  }else if (diffInMinutes > 10080){
    let diff = Math.round(diffInMinutes / 10080)
    if(diff > 1){
      return 'Fyrir ' + diff + ' vikum síðan';
    }else{
      return 'Fyrir 1 viku síðan'
    }
  }else if (diffInMinutes > 1440){
    let diff = Math.round(diffInMinutes / 1440)
    if(diff > 1){
      return 'Fyrir ' + diff + ' dögum síðan';
    }else{
      return 'Fyrir 1 degi síðan'
    }
  }else if (diffInMinutes > 60){
    let diff = Math.round(diffInMinutes / 60)
    if(diff > 1){
      return 'Fyrir ' + diff + ' klukkustundum síðan';
    }else{
      return 'Fyrir 1 klukkustund síðan'
    }
  }else{
    let diff = Math.round(diffInMinutes)
    if(diff > 1){
      return 'Fyrir ' + diff + ' mínútum síðan';
    }else{
      return 'Fyrir minna en 1 mínútu síðan'
    }
  }
}
