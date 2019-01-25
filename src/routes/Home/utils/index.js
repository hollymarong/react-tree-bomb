export const transformMock = (mock) => {
  let data = [];
  if (!Array.isArray(mock)) data = [mock];

  const transformData = (data) => {
    data.map(item => {
      Object.assign(item, {
        isOpen: false,
        isLeaf: true,
      });
      if (item.user || item.group) {
        const children = [].concat(item.user || [], item.group || []);
        Object.assign(item, {
          children,
          isLeaf: false,
        });
      }
      if (item.children) transformData(item.children);
    });
    return data;
  };
  const result = transformData(data);
  return result;
};

export const debounce = function(func, wait, immediate) {
  var timeout, args, context, timestamp, result;
  var later = function() {
    var last = +new Date() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = +new Date();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};
