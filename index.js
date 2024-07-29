function handleformsubmit(event) {
  event.preventDefault();

  let expenseamount = event.target.expenseamount.value;
  let description = event.target.description.value;
  let category = event.target.category.value;

  let obj = {
    expenseamount: expenseamount,
    description: description,
    category: category,
  };

  let obj_serialize = JSON.stringify(obj);

  localStorage.setItem(obj.expenseamount, obj_serialize);
  showUserOnScreen(obj);

  event.target.expenseamount.value = "";
  event.target.description.value = "";
  event.target.category.value = "";
}

function showUserOnScreen(obj) {

  let ul = document.getElementById('userlist');

  let li = document.createElement('li');

  let litext = document.createTextNode(`${obj.expenseamount} - ${obj.description} - ${obj.category}`);

  li.appendChild(litext);
  ul.appendChild(li);

  let EditExpense = document.createElement("button");
  EditExpense.textContent = "Edit Expense";
  EditExpense.className = "btn btn-outline-info border-2 btn-xxl";
  li.appendChild(EditExpense);
  EditExpense.onclick = () => {
    let storedobj = JSON.parse(localStorage.getItem(obj.expenseamount));
    localStorage.removeItem(obj.expenseamount);
    ul.removeChild(li);
    let inputitem = document.querySelectorAll(
      "#expenseamount, #description, #category"
    );
    inputitem[0].value = storedobj.expenseamount;
    inputitem[1].value = storedobj.description;
    inputitem[2].value = storedobj.category;
  };

  let deleteExpense = document.createElement("button");
  let deleteExpensetext = document.createTextNode("DeleteExpense");
  deleteExpense.className = "btn btn-outline-danger border-2 btn-xxl";
  deleteExpense.type = "button";

  deleteExpense.appendChild(deleteExpensetext);
  li.appendChild(deleteExpense);
  deleteExpense.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn")) {
      localStorage.removeItem(obj.expenseamount);
      ul.removeChild(li);
    }
  });
  ul.appendChild(li);
}
