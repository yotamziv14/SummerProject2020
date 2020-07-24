            
            var x;
            var y= 100;
            var falling = false;
            document.addEventListener("mousemove",function(e){
                if(!falling){
                    x = e.clientX;
                }
            },false)
            setInterval(function(){
                ctx.beginPath();
                ctx.clearRect(0, 0, c.width, c.height);
                if(x<=c.width-20 && x>=20){
                ctx.arc(x,y,20,0,Math.PI*2);
                }
                else if(x<=20){
                    ctx.arc(21,100,20,0,Math.PI*2);
                }
                else if(x>=c.width-20){
                    ctx.arc(c.width-21,100,20,0,Math.PI*2);
                }
                ctx.fill();
                ctx.stroke();
            },10)
            
            document.addEventListener("mousedown",function(){
                falling=true;
                var inti = setInterval(function(){
                    if(y<c.height-20){
                        y++;
                    }
                },2);
            },false);