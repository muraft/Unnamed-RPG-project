class Map{
  constructor(map){
    this.width=map.width;
    this.height=map.height;
    this.floor=map.floor;
    this.entities=map.entities;
    this.viewW=5;
    this.viewH=5;
    this.entData=[];

    this.tileW = canvas.width/this.viewW;
    this.tileH = canvas.height/this.viewH;
    this.viewtileW;
    this.viewtileY;
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

    let viewW,viewH;
    if(all===true){
      px=0;
      py=0;
      this.viewTileW=canvas.width/this.width;
      this.viewTileH=canvas.height/this.height;
      viewH=this.width;
      viewW=this.height;
    }
    else{
      this.viewTileW=this.tileW;
      this.viewTileH=this.tileH;
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
        ctx.fillRect(x*this.viewTileW,y*this.viewTileH,this.viewTileW,this.viewTileH);

        //Get entities
        /*
        [0] = x position
        [1] = y position
        [2] = On screen x position
        [3] = On screen y position
        */
        this.entData[this.entities[this.toIndex(x+px,y+py)]]=[x+px,y+py];
        this.entData[this.entities[this.toIndex(x+px,y+py)]].push(x*this.viewTileW,y*this.viewTileH);
      }
    }
  }
}
