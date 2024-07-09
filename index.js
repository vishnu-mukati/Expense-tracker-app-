function handleformsubmit(event) {
    event.preventDefault();

    let expenseamount = event.target.expenseamount.value;
    let description = event.target.description.value;
    let category = event.target.category.value;

    let obj = {
        expenseamount: expenseamount,
        description: description,
        category: category,
    }

    let obj_serialize = JSON.stringify(obj)

    localStorage.setItem(obj.expenseamount, obj_serialize);
    showUserOnScreen(obj);

    event.target.expenseamount.value = '';
    event.target.description.value = '';
    event.target.category.value = '';
}

function showUserOnScreen(obj) {

    let tablebody = document.querySelector('#tablebody');


    let row = document.createElement('tr');

    let amountcell = document.createElement('td');
    amountcell.textContent = obj.expenseamount;
    row.appendChild(amountcell);

    let descriptioncell = document.createElement('td');
    descriptioncell.textContent = obj.description;
    row.appendChild(descriptioncell);

    let categorycell = document.createElement('td');
    categorycell.textContent = obj.category;
    row.appendChild(categorycell);


    let actioncell = document.createElement('td');
    row.appendChild(actioncell);

    let EditExpense = document.createElement('button');
    EditExpense.textContent = 'Edit Expense';
    EditExpense.className = "btn btn-outline-info border-2 btn-xxl"
    actioncell.appendChild(EditExpense)
    EditExpense.onclick = () => {
        let storedobj = JSON.parse(localStorage.getItem(obj.expenseamount));
        localStorage.removeItem(obj.expenseamount);
        tablebody.removeChild(row);
        let inputitem = document.querySelectorAll('#expenseamount, #description, #category')
        inputitem[0].value = storedobj.expenseamount;
        inputitem[1].value = storedobj.description;
        inputitem[2].value = storedobj.category;
    }

    let deleteExpense = document.createElement('button');
    let deleteExpensetext = document.createTextNode('DeleteExpense');
    deleteExpense.className = 'btn btn-outline-danger border-2 btn-xxl';
    deleteExpense.type = 'button'

    deleteExpense.appendChild(deleteExpensetext);
    actioncell.appendChild(deleteExpense)
    deleteExpense.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn')) {
            localStorage.removeItem(obj.expenseamount)
            tablebody.removeChild(row)
        }
    })
    tablebody.appendChild(row)
}
