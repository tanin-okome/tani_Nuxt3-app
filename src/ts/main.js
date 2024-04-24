"use strict";

// タスク一覧
let todoItems = [];

const todoList = document.getElementById("js_todo-list"); // やることリスト
const completeList = document.getElementById("js_complete-list"); // 完了リスト
const addTodoInput = document.querySelector(".js_add-todo_input"); // 入力欄
const addTodoBtn = document.querySelector(".js_add-todo_btn"); // 追加ボタン

// ページロード時
window.addEventListener("load", () => {
  showTodoItem();
});

/**
 * タスクの作成
 */
addTodoBtn.addEventListener("click", () => {
  // 入力内容があれば処理
  if (addTodoInput.value) {
    let newId = 1;

    // todoItemsが0を超えていた場合
    if (todoItems.length > 0) {
      newId = Math.max(...todoItems.map((item) => item.id)) + 1; // idの最大値+1の値をnewIdに代入
    }

    const newTodoItem = {
      id: newId,
      title: addTodoInput.value,
      status: false,
    };

    todoItems = [...todoItems, newTodoItem]; // 新しいTodoアイテムを追加した配列を再代入
    showTodoItem(); // タスクを再表示
    addTodoInput.value = ""; // タイトルの入力欄を空にする
  }
});

/**
 * タスクの登録
 */
const registerTodoItem = (todoItem) => {
  const todoItemTemplate = document.getElementById("js_todo-item-template"); // Todoアイテムのテンプレート
  const todoItemClone = todoItemTemplate.content.cloneNode(true); // Todoアイテムのテンプレートを複製

  const todoItemElm = todoItemClone.querySelector(".js_todo-item"); // Todoアイテム
  const todoTitleElm = todoItemClone.querySelector(".js_todo-title"); // Todoタイトル
  const todoCheckboxElm = todoItemClone.querySelector(".js_checkbox"); // Todoチェックボックス
  const todoDeleteBtnElm = todoItemClone.querySelector(".js_delete-btn"); // Todo削除ボタン

  todoItemElm.setAttribute("id", todoItem.id); // Todoアイテムにidを設定
  todoTitleElm.textContent = todoItem.title; // Todoアイテムにタイトルを設定
  todoCheckboxElm.checked = todoItem.status; // Todoアイテムのチェックボックスの状態をステータスの値に設定

  /**
   * タスクのステータス変更
   */
  todoCheckboxElm.addEventListener("change", (e) => {
    // todoItemsから対象のstatusを変更したtodoItemsを生成する

    console.log(e);

    todoItems = todoItems.map((item) => {
      if (item.id == todoItem.id) {
        return { ...item, status: e.target.checked };
      }

      return item;
    });

    showTodoItem(); // タスクを再表示
  });

  /**
   * タスクの削除
   */
  todoDeleteBtnElm.addEventListener("click", () => {
    // todoItemsから対象を削除したtodoItemsを生成する
    todoItems = todoItems.filter((item) => item.id !== todoItem.id);

    showTodoItem(); // タスクを再表示
  });

  return todoItemElm;
};

/**
 * タスクの表示
 */
const showTodoItem = () => {
  todoList.innerHTML = ""; // todoListを空にする
  completeList.innerHTML = ""; // completeListを空にする

  todoItems.forEach((todoItem) => {
    const todoItemElm = registerTodoItem(todoItem); // todoListにあるデータをあるだけ、Todoアイテムを生成

    // ステータスによって完了リストに追加するか未完了リストを追加するか分岐
    if (todoItem.status) {
      todoItemElm
        .querySelector(".js_todo-title")
        .classList.add("complete-item-text"); // titleにクラスを追加する（テキストに横線をつける）
      completeList.appendChild(todoItemElm); // 完了リストにTodoアイテムを追加
    } else {
      todoList.appendChild(todoItemElm); // 未完了リストにTodoアイテムを追加
    }
  });
};
