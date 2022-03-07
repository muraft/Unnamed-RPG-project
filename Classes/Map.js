class Map{
  constructor(map){
    this.width=map.width;
    this.height=map.height;
    this.floor=map.floor;
    this.entities=map.entities;
    this.viewW=5;
    this.viewH=5;
    this.location=[];

    this.tileW = canvas.width/this.viewW;
    this.tileH = canvas.height/this.viewH;
  }

  toIndex(x,y){
    return y*this.width + x;
  }

  load(px,py,all){
    const halfScreenX=Math.floor(this.viewW/2);
    const halfScreenY=Math.floor(this.viewH/2);

    px-=halfScreenX;
    py-=halfScreenY;

    if(px+halfScreenX>=this.width-halfScreenX)px = this.width-this.viewW;
    if(py+halfScreenY>=this.height-halfScreenY)py = this.height-this.viewH;
    if(px<halfScreenX)px = 0;
    if(py<halfScreenY)py = 0;

    let tileW,tileH,viewW,viewH;
    if(all===true){
      px=0;
      py=0;
      tileW=canvas.width/this.width;
      tileH=canvas.height/this.height;
      viewH=this.width;
      viewW=this.height;
    }
    else{
      tileW=this.tileW;
      tileH=this.tileH;
      viewW=this.viewW;
      viewH=this.viewH;
    }

    for(let y=0;y<viewH;y++)
    {
      for(let x=0;x<viewW;x++)
      {
        //Render floor
        switch(this.floor[this.toIndex(x+px,y+py)]){
          case 0:
          ctx.fillStyle = "#32a852";
          break;
          case 1:
          ctx.fillStyle = "#8a6c2b";
          break;
          case 2:
          ctx.fillStyle = "#2b5ffc";
          break;
          default:
          ctx.fillStyle = "#7d7d7d";
        }
        ctx.fillRect(x*tileW,y*tileH,tileW,tileH);

        //Render entities
        switch(this.entities[this.toIndex(x+px,y+py)]){
          case 1:
          this.location[this.entities[this.toIndex(x+px,y+py)]]=[x+px,y+py]
          ctx.fillStyle = "red";
          break;
        }
        ctx.fillRect(x*tileW+(tileW/4),y*tileH+(tileH/4),tileW/2,tileH/2);
      }
    }
  }
}
