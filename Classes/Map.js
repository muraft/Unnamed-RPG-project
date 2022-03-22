class Map{
  constructor(map){
    this.width=map.width;
    this.height=map.height;
    this.tiles=map.tiles;
    this.tileType=map.tileType;
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

  load(px,py,all,spx,spy){
    if(spx===null)spx=0;
    if(spy===null)spy=0;


    const halfScreenX=Math.floor(this.viewW/2);
    const halfScreenY=Math.floor(this.viewH/2);

    px-=halfScreenX;
    py-=halfScreenY;

    if(px+halfScreenX>=this.width-halfScreenX)px = this.width-this.viewW;
    if(py+halfScreenY>=this.height-halfScreenY)py = this.height-this.viewH;
    if(px+halfScreenX<halfScreenX)px = 0;
    if(py+halfScreenY<halfScreenY)py = 0;

    let viewW,viewH;
    if(all===true){
      px=0;
      py=0;
      this.viewTileW=canvas.width/this.width;
      this.viewTileH=canvas.height/this.height;
      viewH=this.height;
      viewW=this.width;
    }
    else{
      this.viewTileW=this.tileW;
      this.viewTileH=this.tileH;
      viewW=this.viewW;
      viewH=this.viewH;
    }

    for(let y=0;y<viewH+1;y++)
    {
      for(let x=0;x<viewW+1;x++)
      {
        //Render tiles
        let tileId=this.tiles[this.toIndex(x+px,y+py)];
        let row = tileId%tilesetRow;
        let column = tileId>tilesetColumn-1?tileId-(tilesetColumn*row):tileId;
        ctx.drawImage(tileset,tileset.width/tilesetColumn*column,tileset.height/tilesetRow*row,1000,1000,x*this.viewTileW,y*this.viewTileH,this.viewTileW,this.viewTileH);
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
