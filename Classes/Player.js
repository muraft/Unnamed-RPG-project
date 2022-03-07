class Player{
  constructor(x,y){
    this.x=0;
    this.y=0;
    this.step=1;
    this.direction=false;
    this.width=10;
    this.height=10;
    this.id=1;
  }
  control(buttons){
    if(buttons.left)this.direction="left";buttons.left=false;
    if(buttons.right)this.direction="right";buttons.right=false;
    if(buttons.up)this.direction="up";buttons.up=false;
    if(buttons.down)this.direction="down";buttons.down=false;
  }
  update(){
    this.x=map.location[this.id][0];
    this.y=map.location[this.id][1];

    if(this.direction=="left" && this.x>0)this.x-=this.step;
    if(this.direction=="up" && this.y>0)this.y-=this.step;
    if(this.direction=="right" && this.x<map.width-1)this.x+=this.step;
    if(this.direction=="down" && this.y<map.height-1)this.y+=this.step;
    this.direction=false;

    map.entities[map.toIndex(map.location[this.id][0],map.location[this.id][1])]=0;
    map.entities[map.toIndex(this.x,this.y)]=1;
  }
}
