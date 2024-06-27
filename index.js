function handformsubmit(event) {
    event.preventDefault();

    let expenseamount = event.target.expenseamount.value;
    let description = event.target.description.value;
    let category = event.target.category.value;

    let obj = {
        "expenseamount": expenseamount,
        "description": description,
        "category": category,
    }

    let obj_serialize = JSON.stringify(obj)

    localStorage.setItem(obj.expenseamount, obj_serialize);
    shouwuseronscreen(obj);

    event.target.expenseamount.value = '';
    event.target.description.value = '';
    event.target.category.value = '';
}

function shouwuseronscreen(obj) {

    let ul = document.getElementById('userlist');

    let li = document.createElement('li');
    li.textContent = `${expenseamount.value}-${description.value}-${category.value} `;

    let EditExpense = document.createElement('button');
    EditExpense.textContent = 'Edit Expense';
    li.appendChild(EditExpense)
    EditExpense.onclick = () => {
        let storedobj = JSON.parse(localStorage.getItem(obj.expenseamount));
        localStorage.removeItem(obj.expenseamount);
        ul.removeChild(li);
        let inputitem = document.querySelectorAll('#expenseamount,#description,#category')
        inputitem[0].value = storedobj.expenseamount;
        inputitem[1].value = storedobj.description;
        inputitem[2].value = storedobj.category;
    }

    let deleteExpense = document.createElement('button');
    let deleteExpensetext = document.createTextNode('DeleteExpense');
    deleteExpense.className = 'delete-btn';
    deleteExpense.type = 'button'

    deleteExpense.appendChild(deleteExpensetext);
    deleteExpense.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            localStorage.removeItem(obj.expenseamount)
            ul.removeChild(li)
        }
    })
    li.appendChild(deleteExpense)
    ul.appendChild(li)
}
