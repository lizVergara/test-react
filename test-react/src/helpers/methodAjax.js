
export const methodAjax = async (url, meth, dataSave = "") => {

    let charge = true;

    charge = true;

    let options = {
    }
    if (meth == "GET" || meth == "DELETE") {
        options = {
            method: meth,
        }
    }

    if (meth == "POST" || meth == "PUT") {
        options = {
            method: meth,
            body: JSON.stringify(dataSave),
            headers: {
                "Content-type": "application/json"
            }
        };
    }

    const peticion = await fetch(url, options);
    const data = await peticion.json();

    charge = false




    return {
        data,
        charge
    }

}