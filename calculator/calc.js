function insert(num)
{
    document.getElementById('ip').value = document.getElementById('ip').value + num;
}

function equal()
{
    let res = document.getElementById('ip').value;
    if(res)
    {
        document.getElementById('output').innerHTML = eval(res);
    }
}

var andar = document.getElementById("ip");
andar.addEventListener("keydown", function (e) {
    if(e.key === "Enter")
    {
        equal();
    }
});

const button = document.querySelector('.but');

button.addEventListener('touchstart', function() {
  this.classList.add('active');
});

button.addEventListener('touchend', function() {
  this.classList.remove('active');
});