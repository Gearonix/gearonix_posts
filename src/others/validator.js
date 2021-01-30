export let loginVal = function(value){
    if (!value){
        return 'This Field is required';
    }
    if (value.length>14){
        return 'Max length - 15 characters';
    }
    if (value.includes('/') || value.includes('#') || value.includes("'")){
        return 'The field must not contain special characters';
    }
    if (value.length<4){
        return 'Min length - 4 characters';
    }
}