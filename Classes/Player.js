class Player{
  constructor(x,y){
    this.id=1;
    this.x=map.entData[this.id][0];
    this.y=map.entData[this.id][1];
    this.screenX=map.entData[this.id][2];
    this.screenY=map.entData[this.id][3];

    this.step=1;
    this.speed=this.step/25;
    this.stepProgressX=0;
    this.stepProgressY=0;
    this.direction=false;
    this.moveTo=false;

    this.color="red";
    this.width=10;
    this.height=10;
  }
  control(buttons){
    if(buttons.left)this.direction="left";buttons.left=false;
    if(buttons.right)this.direction="right";buttons.right=false;
    if(buttons.up)this.direction="up";buttons.up=false;
    if(buttons.down)this.direction="down";buttons.down=false;
  }
  checkCollision(direction){
    switch(direction){
      case "left":
      return (this.x>0 && map.tileType[map.toIndex(this.x-this.step,this.y)]==0)
      break;
      case "up":
      return (this.y>0 && map.tileType[map.toIndex(this.x,this.y-this.step)]==0)
      break;
      case "right":
      return (this.x<map.width-1 && map.tileType[map.toIndex(this.x+this.step,this.y)]==0)
      break;
      case "down":
      return (this.y<map.height-1 && map.tileType[map.toIndex(this.x,this.y+this.step)]==0)
      break;
    }
  }
  update(){
    if(!this.moveTo){
      this.x=map.entData[this.id][0];
      this.y=map.entData[this.id][1];
      this.xTemp=map.entData[this.id][0];
      this.yTemp=map.entData[this.id][1];
      this.stepProgressX=0;
      this.stepProgressY=0;
      if(this.direction=="left" && this.checkCollision("left")){
        this.moveTo="left";
        this.x-=this.step;
      }
      if(this.direction=="up" && this.checkCollision("up")){
        this.moveTo="up";
        this.y-=this.step;
      }
      if(this.direction=="right" && this.checkCollision("right")){
        this.moveTo="right";
        this.x+=this.step;
      }
      if(this.direction=="down" && this.checkCollision("down")){
        this.moveTo="down";
        this.y+=this.step;
      }
      this.direction=false;
    }
    this.screenX=map.entData[this.id][2];
    this.screenY=map.entData[this.id][3];


    if(this.moveTo!==false)
    {
      if(this.moveTo=="left"){
        this.stepProgressX-=this.speed;
        if(this.xTemp+this.stepProgressX<=this.x){
          this.stepProgressX=Math.ceil(this.stepProgressX);
          this.moveTo=false;
          map.entities[map.toIndex(this.xTemp,this.yTemp)]=0;
          map.entities[map.toIndex(this.x,this.y)]=1;
        }
      }
      else if(this.moveTo=="up"){
        this.stepProgressY-=this.speed;
        if(this.yTemp+this.stepProgressY<=this.y){
          this.stepProgressY=Math.ceil(this.stepProgressY);
          this.moveTo=false;
          map.entities[map.toIndex(this.xTemp,this.yTemp)]=0;
          map.entities[map.toIndex(this.x,this.y)]=1;
        }
      }
      else if(this.moveTo=="right"){
        this.stepProgressX+=this.speed;
        if(this.xTemp+this.stepProgressX>=this.x){
          this.stepProgressX=Math.floor(this.stepProgressX);
          this.moveTo=false;
          map.entities[map.toIndex(this.xTemp,this.yTemp)]=0;
          map.entities[map.toIndex(this.x,this.y)]=1;
        }
      }
      else if(this.moveTo=="down"){
        this.stepProgressY+=this.speed;
        if(this.yTemp+this.stepProgressY>=this.y){
          this.stepProgressY=Math.floor(this.stepProgressY);
          this.moveTo=false;
          map.entities[map.toIndex(this.xTemp,this.yTemp)]=0;
          map.entities[map.toIndex(this.x,this.y)]=1;
        }
      }
    }
    else{
      map.entities[map.toIndex(this.xTemp,this.yTemp)]=0;
      map.entities[map.toIndex(this.x,this.y)]=1;
    }
  }

  draw(){
    ctx.fillStyle=this.color;
    ctx.fillRect(this.screenX+(map.viewTileW/4)+this.stepProgressX*map.viewTileW,this.screenY+(map.viewTileH/4)+this.stepProgressY*map.viewTileH,map.viewTileW/2,map.viewTileH/2);
  }
}
