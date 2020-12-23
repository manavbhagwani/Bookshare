var current=0;
const btn=document.querySelector("button");
btn.addEventListener("click",async (e)=>{
    e.preventDefault();
    let flag=check(document.querySelector("#name"),1) && check(document.querySelector("#regno"),2) && special(document.querySelector("#regno"),2,9) && check(document.querySelector("#mobno"),3) && special(document.querySelector("#mobno"),4,10) && check(document.querySelector("#email"),4) && valid(document.querySelector("#email"),4) && check(document.querySelector("#password"),5) && special1(document.querySelector("#password"),5,6);
    if(flag)
    {
        const res=await axios.post("/signup",{
            name:document.querySelector("#name").value,
            regno:document.querySelector("#regno").value,
            mobno:document.querySelector("#mobno").value,
            email:document.querySelector("#email").value,
            password:document.querySelector("#password").value
        });
        if(typeof(res.data)=="object")
        {
            var data=res.data.errors;
            for(let i=0;i<data.length;i++)
            {
                let curr=0;
                if(data[0].param=="name")
                    curr=1;
                else if(data[0].param=="regno")
                    curr=2;
                else if(data[0].param=="name")
                    curr=3;
                else if(data[0].param=="mobno")
                    curr=4;
                else if(data[0].param=="email")
                    curr=5;
                else if(data[0].param=="password")
                    curr=6;
                if(curr!=current)
                {
                    let field=document.querySelector("#"+data[0].param);
                    span=document.createElement("span");
                    span.textContent=data[0].msg;
                    span.classList.add("remove");
                    field.parentElement.appendChild(span);
                    current=curr;
                }
            }
        }
        else
        {
            window.location.pathname="/";
        }
    }
});
function check(field,curr){
    let flag=onlyspace(field.value);
    if(!flag && curr!=current)
    {
        span=document.createElement("span");
        span.textContent="Fill in the required field";
        span.classList.add("remove");
        field.parentElement.appendChild(span);
        current=curr;
        return false;
    }
    if(!flag)
        return false;
    return true;
}
function onlyspace(str){
    for(i in str)
    {
        if(str[i]!=' ')
            return true;
    }
    return false;
}
function special(field,curr,size)
{
    let flag=(field.value.length==size)?true:false;
    for(let i=0;i<field.value.length;i++)
    {
        if(parseInt(field.value.charCodeAt(i))<48 || parseInt(field.value.charCodeAt(i))>57)
        {
            flag=false;
            break;
        }
    }
    if(!flag && curr!=current)
    {
        span=document.createElement("span");
        span.textContent="The field value is invalid";
        span.classList.add("remove");
        field.parentElement.appendChild(span);
        current=curr;
        return false;
    }
    if(!flag)
        return false;
    return true;
}
function special1(field,curr,size)
{
    let flag=(field.value.length>=size)?true:false;
    if(!flag && curr!=current)
    {
        span=document.createElement("span");
        span.textContent="Minimum length should be 6";
        span.classList.add("remove");
        field.parentElement.appendChild(span);
        current=curr;
        return false;
    }
    if(!flag)
        return false;
    return true;
}
function valid(field,curr)
{
    let flag=field.value.includes("@") && field.value.includes(".com");
    if(!flag && curr!=current)
    {
        span=document.createElement("span");
        span.textContent="The field value is invalid";
        span.classList.add("remove");
        field.parentElement.appendChild(span);
        current=curr;
        return false;
    }
    if(!flag)
        return false;
    return true;
}
const ael=document.querySelectorAll("input");
for(let i=0;i<ael.length;i++)
{
    ael[i].addEventListener("click",clearscreen);
}
function clearscreen()
{
    current=0;
    var arr=document.querySelectorAll(".remove");
    for(let i=0;i<arr.length;i++)
    {
        arr[i].remove();
    }
}
