export const useListItemActions = () => {
  
  const handleAddItem = ( inputValue, setInputValue, setItems ) => {
    // 確認有無輸入資料
    if (inputValue.trim().length === 0) {
      return;
    }
    // 新增輸入的資料 物件
    setItems((items) => {
      return [
        ...items,
        {
          id: Math.random() * 100,
          title: inputValue.trim(),
          isDone: false,
        },
      ];
    });
    setInputValue(""); // clean input
  };
  
  const handleKeyDown = ( e, inputValue, setInputValue, setItems ) => {
    if (e.key !== "Enter") return;
    if (inputValue.trim().length === 0) return;
    e.preventDefault(); // 阻止換行產生

    // 新增輸入的 item 物件
    setItems((items) => {
      return [
        ...items,
        {
          id: Math.random() * 100,
          title: inputValue.trim(),
          isDone: false,
        },
      ];
    });
    setInputValue("");
  };;

  const handleSave = ({ id, title, items, setItems }) => {
    console.log("💾 Saving:", id, title);
    const updatedItems = items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title,
            isEdit: false,
          };
        }
        return item;
      });
    setItems(updatedItems);
  };

  const handleDelete = ( id, setItems ) => {
    setItems((items) => {
      return items.filter((item) => {
        return item.id !== id;
      });
    });
  };

  const handleChangeMode = ({ id, isEdit, setItems }) => {
    setItems((items) => {
      return items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isEdit,
          };
        }
        return { ...item, isEdit: false };
      });
    });
  };

  return {
    handleAddItem ,
    handleKeyDown,
    handleSave,
    handleDelete,
    handleChangeMode,
  };
};
