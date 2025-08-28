export function getRandomJoke(): string {
  const jokes: string[] = [
    '11:59:59 am is my favorite time of day. It’s second to noon.',
    'I held up my watch to a mirror. It was time for reflection.',
    'I bought five watches the other day.  I have a lot of time on my hands….',
    'How can you tell when your clock is hungry? It goes back four seconds.',
    'I asked if I could leave work early the other day, and the boss said yes, if I made up the time. I said “sure, it’s twenty past fourteen”.',
    'A friend of mine has taken up eating watches, but takes forever to get through each one. It’s time consuming.',
    'I know someone who was habitually late, until his doctor reccomended sleeping in a herb garden. Sounds odd, I know, but now he wakes up on Thyme.',
    'I heard a really good time travel joke tomorrow.',
    'Pleased to say I was voted “Most likely to travel back in time, Class of 2053”.',
    'Feeling nostalgic about my childhood summers, when we would climb into old tires and roll down the hills. They were goodyears.',
    'What happens when you annoy a clock? It gets ticked off.',
    'Why did the man throw the clock out the window? He wanted to see time fly.',
    'What time does a duck wake up? At the quack of dawn.',
    'Why is everyone so tired on April 1st? They just finished a March of 31 days.',
    'Why did the clock get sent to the principal’s office? It was tocking too much.'
  ]

  const i = Math.floor(Math.random() * jokes.length)
  return jokes[i]
}
