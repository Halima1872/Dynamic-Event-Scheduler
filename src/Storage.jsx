
const Storage = {
    getItems: (items) => {
      let data = localStorage.getItem(items);
      if (data) {
        return JSON.parse(data);
      } else {
        return [];
      }
    },
    setItems: (items, data) => {
        localStorage.setItem(items, JSON.stringify(data));
        },
    getItem : (item) => {
        let data = localStorage.getItem(item);
        if (data) {
            return data;
        } else {
            return "";
        }
    },
    setItem : (item, data) => {
        localStorage.setItem(item, data);
    }
  };
  
  export default Storage;