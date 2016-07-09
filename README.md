# Welcome to Arcade Frogger

## Introduction

**Frogger** is a rather simple game. The goal is that you start from a friendly **grass** court and reach a water body on the **opposite end**  over a set of pathways where **_hostile bugs_** run around at varying speeds. As you would have guessed, you have to avoid colliding with the bugs and when you reach the other side, you get points. Simple, isn't it?

## The Landscape

The game is played in a landscape consisting of 3 different regions:

- The **grass** landscape that is two rows tall. You can move sideways in the grass land but you cannot go down.
- The roadways made of **stone blocks**, three rows tall. Here you can go up, down, left or right as you please. Just don't let the bugs bite you. 
- The **blue** water body which is your destination. Do not worry, it is indeed quite shallow and thou shall not drown, however hard you try. Reach here and you win some points. But you cannot go swimming or fishing for gems in the cool waters or think of staying back and collecting more and more points. No escape from hard work, just **_go back to your starting point_** and find a fresh route back to win new points. Also, don't try to jump down to the stone block paved roadways from here, you will be tossed over to the starting point mercilessly.

## The Entities

The game consists of a few entities:

### Player
  This is _you_. You can choose to be represented in the screen in 5 different ways. Pick an avatar that you fancy. (n case you aren't aware already - _avatar_ is a Sanskrit word for an embodiment of a Soul/Divine figure. You can change your avatar before you start playing or even between rounds when you are resting.
   
### Enemies
  The "enemies" are basically bugs that are waiting to bite you while you are trying to cross over to the blue area. If you collide with them, you have to start all over again. And they have this habit of running around in circles at varying speeds, each of them at different speeds (otherwise, why should they be called bugs?).
  
  **Here is a tip**: They don't harm you if you step on their tail but are unforgiving if you let them see your face. No, this is not because the bugs are learning to be compassionate, but because I was too lazy to write yet another math equation for the tail.

### Gems
  The Gems are precious stones in **blue**, **green** or **orange** color that appear in the blue water region. As even a kid can guess, if you capture a gem, you get more points. However, just as you cannot predict when a great opportunity will show up in real life, the Gems can appear and disappear at their own will, at their own place of choosing. Hurry up and grab when you see one.

## Scoring and Time Limits

Cross over to the blue waters and get _100_ points. If you happen to capture a Gem in the blue waters, you would get **_1000_** pts instead. A single run of the game lasts for **60 secs**. You can play again and again and again as long as you wish. Scores and elapsed time for the current run will appear in the bottom most green landscape. Top three scores will be displayed in a panel titled **Top Scores**.

## The Game Loop

1. Look at the **Choose Your Avatar** panel. Are you happy with the face highlighted? If not, pick another one from the displayed set.
2. Hit the `Start` button. (ok, I have demonstrated I know how to use backquotes in md syntax).
3. Now go from the green landscape to blue water body over the roadways avoiding the marauding bugs. Use Arrow keys → , ← , ↑,  ↓  to navigate the roadways.
4. If your boss is calling you, hit the `Stop` button. (It is a single button which changes text depending on the state of the game).
5. At the end of a round of play, look at the **Top Scores** panel. This will display top 3 scores across all avatars.
6. Want a change of player face before starting the next round? Do that in the **Choose Your Avatar** panel.
7. Hit `Play Again` as long as you wish or until the next meeting.

#### Caveat

+ Your scoring exploits are promptly forgotten as soon as you close the browser window. Relaunch to restart all over again.
+ Requires a keyboard and mouse to play, has not been tested with touch interfaces.

##### Credits

[Udacity](https://classroom.udacity.com/nanodegrees/nd001/syllabus) -- for the game idea, image artifacts and a good starter code. Of course, all bugs are mine (Sankar's). 