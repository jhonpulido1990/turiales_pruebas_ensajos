import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Players } from 'src/app/commons/interfaces/player.interface';
import { PlayersService } from 'src/app/services/players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  _playerService = inject(PlayersService)
  _location = inject(Location);
  _router = inject(Router)
  player!: Players
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    decks: new FormArray([]),
  });

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this._location.getState());
    this.player = (this._location.getState() as any).player;
    if (this.player) this.setCurentPlayer(this.player);
  }

  get decks() {
    return (this.form.get('decks') as FormArray).controls;
  }

  createDeck(){
    (this.form.get('decks') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        cards: new FormControl(null, Validators.required),
      })
    )
  }

  setCurentPlayer(player: any) {
    this.form.patchValue(this.player as any);
    player.decks.map((deck: any) => {
      const deckForm = new FormGroup({
        name: new FormControl(deck.name),
        cards: new FormControl(deck.cards),
      });
      (this.form.get('decks') as FormArray).push(deckForm)
    });
  }

  updatePlayer() {
    this._playerService.updatePlayer({
      id: this.player.id,
      ...this.form.getRawValue(),
    } as Players);
    this._router.navigate(['users'])
  }
}
