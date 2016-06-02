function Player(firstName, lastName, score) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.score = score;
}

Player.prototype.fullName = function fullName() {
  return this.firstName + ' ' + this.lastName;
};
