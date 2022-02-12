export const getUserById = (id) => {
    //fetch(`localhost:4000/getUser/${id}`)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    try {
        debugger;
        fetch("http://localhost:4000/getUser/61912e1ae1c8a95a4967a277", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                return result;
            }
            ).catch(error => console.log('error', error));
    }
    catch (e) { console.log(e) }

}
//אותה קריאה שמקבלת שם וסיסמא מנתבת לראוט המתאים בנוד