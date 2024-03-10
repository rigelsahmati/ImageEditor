const inputFile = document.getElementById('input')
const inputBtn = document.querySelector('.chose-img')
const image = document.querySelector('.image')
const filterBtn = document.querySelectorAll('.edit-btn')
const inputSlide = document.querySelector('.inputrange')
const percentage = document.getElementById('value')
const resetBtn = document.getElementById('reset')
const rotateBtn = document.querySelectorAll('.flip-btn')
const downloadBtn = document.querySelector('.download')

let brightnes = 100, saturation = 100, inversion = 0, blur = 0, grayscale = 0
let rotate = 0, reflect_left = 1, reflect_top = 1
function setbg() {
    document.querySelector('.container').classList.remove('disabled')
    let file = inputFile.files[0];
    image.src = URL.createObjectURL(file)
    reset()


}

function aplplyFilter() {
    image.style.filter = `brightness( ${brightnes}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) blur(${blur}px)`
    image.style.transform = `rotate( ${rotate}deg) scale(${reflect_left},${reflect_top}) `
}
function reset() {
    brightnes = 100, saturation = 100, inversion = 0, grayscale = 0, blur = 0
    document.querySelector('.edit-btn.edit-btn-active').classList.remove('edit-btn-active')
    document.querySelectorAll('.edit-btn')[0].classList.add('edit-btn-active')
    document.querySelector('.filtername').innerHTML = document.querySelectorAll('.edit-btn')[0].innerHTML
    percentage.innerText = brightnes + '%'
    inputSlide.value = brightnes
    inputSlide.max = 200
    rotate = 0, reflect_left = 1, reflect_top = 1
    aplplyFilter()
}

filterBtn.forEach(Option => {
    Option.addEventListener('click', () => {
        document.querySelector('.edit-btn.edit-btn-active').classList.remove('edit-btn-active')
        Option.classList.add('edit-btn-active')
        if (Option.id === 'brightnes') {
            document.querySelector('.filtername').innerHTML = Option.innerHTML
            percentage.innerText = brightnes + '%'
            inputSlide.max = 200
            inputSlide.value = brightnes
        }
        else if (Option.id === 'saturation') {
            document.querySelector('.filtername').innerHTML = Option.innerHTML
            percentage.innerText = saturation + '%'
            inputSlide.max = 200
            inputSlide.value = saturation


        }
        else if (Option.id === 'inversion') {
            document.querySelector('.filtername').innerHTML = Option.innerHTML
            percentage.innerText = inversion + '%'
            inputSlide.value = inversion
            inputSlide.max = 100
        }
        else if (Option.id === 'grayscale') {
            document.querySelector('.filtername').innerHTML = Option.innerHTML
            percentage.innerText = grayscale + '%'
            inputSlide.value = grayscale
            inputSlide.max = 100
        }
        else if (Option.id === 'blur') {
            document.querySelector('.filtername').innerHTML = Option.innerHTML
            percentage.innerText = blur + '%'
            inputSlide.value = blur
            inputSlide.max = 10
        }
    })
});


function chaneValue() {
    percentage.innerText = inputSlide.value + '%'
    let activeBtn = document.querySelector('.edit-btn.edit-btn-active')
    if (activeBtn.id === 'brightnes') {
        brightnes = inputSlide.value
        aplplyFilter()
    }
    else if (activeBtn.id === 'saturation') {
        saturation = inputSlide.value
        aplplyFilter()
    }
    else if (activeBtn.id === 'inversion') {
        inversion = inputSlide.value
        aplplyFilter()
    }
    else if (activeBtn.id === 'grayscale') {
        grayscale = inputSlide.value
        aplplyFilter()
    }
    else if (activeBtn.id === 'blur') {
        blur = inputSlide.value
        aplplyFilter()
    }

}
rotateBtn.forEach(Option => {
    Option.addEventListener('click', () => {
        if (Option.id === 'rotate-left') {
            rotate += 90
            aplplyFilter()
        }
        else if (Option.id === 'rotate-right') {
            rotate -= 90
            aplplyFilter()
        }
        else if (Option.id === 'reflect-left') {
            if (reflect_left === -1) {
                reflect_left = 1
            }
            else {
                reflect_left = -1
            }
            aplplyFilter()
        }
        else if (Option.id === 'reflect-top') {
            if (reflect_top === -1) {
                reflect_top = 1
            }
            else {
                reflect_top = -1
            }
            aplplyFilter()
        }
    })
}
)

function download() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.filter = `brightness(${brightnes}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) blur(${blur}px`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate != 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(reflect_left, reflect_top);
    ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

inputSlide.addEventListener('input', () => chaneValue())
inputFile.addEventListener('change', () => setbg())
inputBtn.addEventListener('click', () => { inputFile.click() })
resetBtn.addEventListener('click', () => reset())
downloadBtn.addEventListener('click', () => download())
