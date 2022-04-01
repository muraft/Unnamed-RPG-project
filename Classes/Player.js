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

    this.idle=0;
    this.walk=0;
    this.sprite=new Image();
    this.sprite.src="media/sprite.png";
  }
  control(buttons){
    if(!this.moveTo){
      if(this.direction==false){
        if(buttons.left){
          this.idle=this.direction=0;
        }
        if(buttons.up){
          this.idle=this.direction=1;
        }
        if(buttons.right){
          this.idle=this.direction=2;
        }
        if(buttons.down){
          this.idle=this.direction=3;
        }
      }
    }
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
  sendLocation(){
    this.moveTo=false;
    this.walk=0;
    map.entities[map.toIndex(this.xTemp,this.yTemp)]=0;
    map.entities[map.toIndex(this.x,this.y)]=1;
  }
  update(){
    //Checking if the player is moving
    if(!this.moveTo){
      this.x=map.entData[this.id][0];
      this.y=map.entData[this.id][1];
      this.xTemp=map.entData[this.id][0];
      this.yTemp=map.entData[this.id][1];
      this.stepProgressX=0;
      this.stepProgressY=0;
      if(this.direction===0 && this.checkCollision("left")){
        this.moveTo="left";
        this.x-=this.step;
      }
      if(this.direction===1 && this.checkCollision("up")){
        this.moveTo="up";
        this.y-=this.step;
      }
      if(this.direction===2 && this.checkCollision("right")){
        this.moveTo="right";
        this.x+=this.step;
      }
      if(this.direction===3 && this.checkCollision("down")){
        this.moveTo="down";
        this.y+=this.step;
      }
      this.direction=false;
    }
    this.screenX=map.entData[this.id][2];
    this.screenY=map.entData[this.id][3];

    //Move animation
    if(this.moveTo!==false)
    {
      let totalX=this.xTemp+this.stepProgressX;
      let totalY=this.yTemp+this.stepProgressY;
      if(this.moveTo=="left"){
        this.stepProgressX-=this.speed;
        this.walk=(totalX<=this.xTemp-this.step/2)?1:2;
        if(totalX<=this.x){
          this.stepProgressX=Math.ceil(this.stepProgressX);
          this.sendLocation();
        }
      }
      else if(this.moveTo=="up"){
        this.stepProgressY-=this.speed;
        this.walk=(totalY<=this.yTemp-this.step/2)?1:2;
        if(totalY<=this.y){
          this.stepProgressY=Math.ceil(this.stepProgressY);
          this.sendLocation();
        }
      }
      else if(this.moveTo=="right"){
        this.stepProgressX+=this.speed;
        this.walk=(totalX<=this.xTemp+this.step/2)?1:2;
        if(totalX>=this.x){
          this.stepProgressX=Math.floor(this.stepProgressX);
          this.sendLocation();
        }
      }
      else if(this.moveTo=="down"){
        this.stepProgressY+=this.speed;
        this.walk=(totalY<=this.yTemp+this.step/2)?1:2;
        if(totalY>=this.y){
          this.stepProgressY=Math.floor(this.stepProgressY);
          this.sendLocation();
        }
      }
    }
    else{
      this.sendLocation();
    }
  }

  draw(){
    ctx.drawImage(this.sprite,this.walk*this.sprite.width/3,this.idle*this.sprite.height/4,this.sprite.width/3,this.sprite.height/4,this.screenX+this.stepProgressX*map.viewTileW,this.screenY+this.stepProgressY*map.viewTileH,map.viewTileW,map.viewTileH);
  }
}
