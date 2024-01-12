function putResToPrediction(apiRes, localStorageRes)
{
    localStorageRes = localStorageRes == null ? "پیدا نشد" : localStorageRes;
    if (apiRes == null)
    { // درصورت خالی بودنفیلد جنسیت در جیسان ارسالی خطا نشان می دهیم
        document.getElementById("error").style.display = 'block';
        document.getElementById("prediction").innerHTML = "لوکال استوریج : " + localStorageRes + "<br>";
        return;
    } else
    { // درغیر این صورت جنسیت را در محل مشخص جاگزین می کنیم
        document.getElementById("prediction").innerHTML = "وبگاه : " + apiRes + "<br>";
        document.getElementById("prediction").innerHTML += "لوکال استوریج : " + localStorageRes + "<br>";
        return;
    }
}

async function Submit()
{
    document.getElementById("error").style.display = 'none'; // پاک کردن خطا
    var name = document.getElementById("name").value; // گرفتن نام از ورودی
    var localStorageRes = localStorage.getItem(name);
    var options = {
        method: 'GET' // تعیین متد درخواست
    }
    var result = await fetch('https://api.genderize.io/?' + new URLSearchParams({
        name: name
    }, options)).then(res => res.json()).then(data => putResToPrediction(data.gender, localStorageRes)); // ارسال درخواست و هندل کردن پرامیس آن
    return;
}

function Save()
{
    document.getElementById("error").style.display = 'none'; // پاک کردن خطا
    var name = document.getElementById("name").value; // گرفتن نام از ورودی
    var gender = 'male';
    var maleRadio = document.getElementById("male");
    var femaleRadio = document.getElementById("female");
    if (maleRadio.checked)
    { // چک کردن ست بودن مقدار مرد
        gender = 'male';
    } else if (femaleRadio.chekced)
    {
        // چک کردن ست بودن مقدار زن
        gender = 'female';
    }
    else
    { // خطا دادن درصورت چک نبودن هیچ یک از مقادیر
        document.getElementById("error").style.display = 'block';
        document.getElementById("error").innerText = 'حتما یک جنسیت باید انتخاب شود';
        return;
    }
    localStorage.setItem(name, gender); // ست کردن مقدار در لوکال استوریج
    document.getElementById("MessageText").innerText = "Saved Answer"; // نمایش پیغام درکادر مربوطه
}

function Clear()
{
    document.getElementById("MessageText").innerText = ""; // خالی کردن کادر
}
