'use client'

export default function Produtos(){
    function copiar(){
        let text = `
<style>
.fullscreen-player{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9997;
    
}

.fullscreen-player--profile{
    position: absolute;
    top: 20px;
    left: 30px;
    display: flex;
    align-items: center;
    height: 50px;
    border-radius: 50px;
    color: #fff;
    gap: 10px;
}

.fullscreen-player--videowrapper{
    position: relative;
    z-index: 9998;
    background-image: linear-gradient(#091d1d3a, #3b3b3b);
    height: 100%;
    display: flex;
}

.fullscreen-player--videowrapper img{
    width: 30px;
    height: 30px;
    border-radius: 50px;
}

@media only screen and (max-width: 768px){
    .fullscreen-player--videowrapper{
        width: 100%;
    }
}

@media only screen and (min-width: 768px){
    .fullscreen-player--videowrapper{
        width: 40%;

    }
}

@media only screen and (min-width: 1268px){
    .fullscreen-player--videowrapper{
        width: 30%;

    }
}

#close-video-btn{
    appearance: none;
    position: absolute;
    background-color: transparent;
    border: none;
    outline: none;
    color: #fff;
    right: 40px;
    width: 30px;
    height: 30px;
    top: 30px;
    font-size: 20px;    
    cursor: pointer;
    z-index: 9999;
}



.roundplayer video{
    width: 100%;
    height: 100%;
}

.fullscreen-player--videowrapper video{
    width: 100%;
}

</style>
           <script>
                var href = window.location.href
                vediwScript = document.createElement('script')
                vediwScript.src = "https://veddiw.pythonanywhere.com/api/render-player/?url="+href
                document.body.appendChild(vediwScript)
            </script>  
            `

            navigator.clipboard.writeText(text)
            window.alert('código copiado! Agora cole em seu tagmanager como "html personalizado"')
    }
    return(
        <main className="flex flex-col items-center justify-between p-6">
           C O N F I G U R A Ç Õ E S
           <h2>Cole este código em seu Tag Manager:</h2>
           <div className="border">
            <div className="border-b flex bg-slate-200 w-full justify-between items-center px-6 py-2">
                <div>HTML Personalizado - Veddiw</div>
                <button onClick={copiar} className="secondary-button">Copiar</button>
            </div>
           
           <pre className="overflow-y-scroll max-h-80 bg-slate-800 text-white">
            {`
<style>
.fullscreen-player{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9997;
    
}

.fullscreen-player--profile{
    position: absolute;
    top: 20px;
    left: 30px;
    display: flex;
    align-items: center;
    height: 50px;
    border-radius: 50px;
    color: #fff;
    gap: 10px;
}

.fullscreen-player--videowrapper{
    position: relative;
    z-index: 9998;
    background-image: linear-gradient(#091d1d3a, #3b3b3b);
    height: 100%;
    display: flex;
}

.fullscreen-player--videowrapper img{
    width: 30px;
    height: 30px;
    border-radius: 50px;
}

@media only screen and (max-width: 768px){
    .fullscreen-player--videowrapper{
        width: 100%;
    }
}

@media only screen and (min-width: 768px){
    .fullscreen-player--videowrapper{
        width: 40%;

    }
}

@media only screen and (min-width: 1268px){
    .fullscreen-player--videowrapper{
        width: 30%;

    }
}

#close-video-btn{
    appearance: none;
    position: absolute;
    background-color: transparent;
    border: none;
    outline: none;
    color: #fff;
    right: 40px;
    width: 30px;
    height: 30px;
    top: 30px;
    font-size: 20px;    
    cursor: pointer;
    z-index: 9999;
}



.roundplayer video{
    width: 100%;
    height: 100%;
}

.fullscreen-player--videowrapper video{
    width: 100%;
}

</style>
           <script>
                var href = window.location.href
                vediwScript = document.createElement('script')
                vediwScript.src = "https://veddiw.pythonanywhere.com/api/render-player/?url="+href
                document.body.appendChild(vediwScript)
            </script>  
            `}
           </pre>
           </div>
        </main>
    )
}