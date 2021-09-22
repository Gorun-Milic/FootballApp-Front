import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Playerclubdto } from '../dto/Playerclubdto';
import { Player } from '../model/Player';
import { Playerclub } from '../model/Playerclub';
import { AuthService } from '../services/auth.service';
import { PlayerService } from '../services/player.service';

@Directive({
  selector: '[isSaved]'
})
export class IsSavedDirective implements OnInit {

  @Input() player: Player;

  public playerclub = new Playerclub(undefined, undefined, undefined);
  public saved: boolean;

  constructor(private elementRef: ElementRef,
    private playerService: PlayerService,
    private authService: AuthService) { }

  ngOnInit() {
    this.checkIfSaved();
  }

  checkIfSaved() {
    this.playerService.isSaved(new Playerclubdto(undefined, this.player.playerid, this.authService.getClub().clubid,)).subscribe(data => {
      this.playerclub.playerclubid = data;
      data == 0 ? this.saved = false : this.saved = true;
      this.setStyle();
    });
  }

  setStyle() {
    if (this.saved == true) {
      this.elementRef.nativeElement.style.backgroundColor = '#eb4034';
      this.elementRef.nativeElement.innerText = "Forget";
    } else {
      this.elementRef.nativeElement.style.backgroundColor = '#00a3cc';
      this.elementRef.nativeElement.innerText = "Save";
    }

  }

  @HostListener('click')
  saveOrForget() {
    if (!this.saved) {
      let playerclub = new Playerclubdto(undefined, this.player.playerid, this.authService.getClub().clubid);
      this.playerService.savePlayerclub(playerclub).subscribe(data => {
        this.checkIfSaved();
      })
    } else {
      this.playerService.unSave(this.playerclub.playerclubid).subscribe(data => {
        this.checkIfSaved();
      },
      error=>{
        this.checkIfSaved();
      });
    }
  }



}
