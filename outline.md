1. Get access to variables from html page.
2. Add event listener to form element.
   >its function should first prevent default behaviour of submit button.
   >get the value input.
   >create new element.
   >add an attribute to it which is ID.
    >to create id 
    createRandomId();
    ```
     function createRandomId()
    {
        return Math.Random().toStringify(16).slice();
    }
    ```
    >to define css of newly added element 
    HTML code can be written inside ``` ` ` ```.
    >append the created node to the list.
    >access the buttons after the element is created.
    >add editItems() to edit btn and deleItems() to dele button.

3. performing edit,delete,add to LocalStorage
4. editItems() in this function the id is accessed and that id is replaced with the new one.
5. deleItems() accessing the element and removing it using in built remove() function.
6. primary localstorage() function that check whether list exists or not and if it does returning get value to called function
7. adding to localStorage : call localstorage().
    and push new element in it.
8. editing from local storage: taking values from localstorage and setting them to new values.
9. deleting items: calling localstorage and using remove function remove it.
10. clear Button: to remove all the items from the page. iterate a loop through list and remove all the elements.
11. setToDefault() used to set clear text box and changing the values to add or submit.
12. view list onLoad of the page:
    get the items from the localstorage convert it to values from object and then create new HTML element.
    
   
   


   