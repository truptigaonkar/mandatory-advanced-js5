import { BehaviorSubject } from 'rxjs';

export const token$ = new BehaviorSubject(window.localStorage.getItem('token'));

export function updateToken(newToken){
  newToken ? window.localStorage.setItem('token', newToken) : window.localStorage.removeItem('token')
  token$.next(newToken);
}

export const favorites$ = new BehaviorSubject(JSON.parse(window.localStorage.getItem('favorites')) || []);

//For resetting favorites
//export const favorites$ = new BehaviorSubject([]);

export function updateFavoriteObservable(newFavoritesArray) {
  //Turning array into string
  let favoritesString = JSON.stringify(newFavoritesArray);

  //Updating local storage with new favorites string
  window.localStorage.setItem('favorites', favoritesString);

  console.log('local storage: ', window.localStorage);

  //Updating favorites observable
  favorites$.next(newFavoritesArray);
}

export function removeFavorites() {
  window.localStorage.removeItem('favorites');
  favorites$.next(null);
}
