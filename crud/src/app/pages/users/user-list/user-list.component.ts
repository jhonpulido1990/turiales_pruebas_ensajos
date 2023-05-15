import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersService } from 'src/app/services/players.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime } from 'rxjs';
import { Players } from 'src/app/commons/interfaces/player.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{
  _playerService = inject(PlayersService);
  searcher = new FormControl('');
  players$!: Observable<Players[]>;
  _router = inject(Router)

  ngOnInit(): void {
    this.players$ = this._playerService.getPlayer()
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    /* this._playerService.getPlayer().subscribe((res) => console.log(res)); */
    this.searcher.valueChanges.pipe(debounceTime(1000)).subscribe( (search) => {
      if (search) {
        this.players$ = this._playerService.getPlayer(search);
      } else {
        this.players$ = this._playerService.getPlayer();
      }
    })
  }

  editPlayer(player: Players) {
    this._router.navigateByUrl('users/edit', { state: { player } });
  }
  deletePlayer(player: Players) {
    if (confirm(`seguro de borrar a ${player.name}`)){
      this._playerService.deletePlayer(player.id)
    }
  }
}
