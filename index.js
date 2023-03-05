document.getElementById("color-picker").addEventListener("submit", function(e){
    e.preventDefault()
    generateColorScheme()
})

function generateColorScheme(){

    const myColor = document.getElementById("my-color").value 
    const scheme = document.getElementById("select-scheme").value

    //It's a GET request as we are not storing any data onto the server, 
    // but just fetching range of colors against any chosen color.

    fetch(`https://www.thecolorapi.com/scheme?hex=${myColor.slice(1,7)}&mode=${scheme}&count=5`)
        .then(res => res.json())
        .then((data => {
            //we need to store all the colors passed in by API onto an array
            let colorArray = []
            for (let i = 0; i < data.colors.length; i++) {
                colorArray.push(data.colors[i].hex.value);
            }
            // now that we have all colors in an array, we can loop over it and render on DOM via empty string
            let html = ''
            for (let color of colorArray){
                html += `<div class="mid-section">
                            <div id="color-scheme" class="shape" style="background-color:${color}"></div>
                            <p>${color}</p>
                        </div>`
            }
            // rendering onto DOM
            document.querySelector("main").innerHTML = html

        }))

}