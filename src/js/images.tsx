const fac = 10

// const pexel = (id:any) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
export const images = [
  // Front
  // { position: [0, 0, 1.5 * fac], rotation: [0, 0, 0], url: "/images/robot.png" },
  // Back
  {
    clip: "polygon(0 0, 100% 0%, 75% 100%, 0% 100%)",
    pos: [-0.8 * fac, 0, -0.6 * fac], rot: [0, 0, 0],
    name: "Troy Francis",
    id: "Troy",
    creator: "Troy",
    url: "/images/Troy.webp"
  },
  {
    clip: "polygon(25% 0, 80% 0, 90% 100%, 0 100%)",
    pos: [0.8 * fac, 0, -0.6 * fac], rot: [0, 0, 0],
    name: "Aaron Clarey",
    id: "Aaron",
    creator: "Aaron",
    url: "/images/Aaron.webp"
  },
  // Left
  {
    clip: "polygon(0 0, 100% 0, 100% 100%, 10% 100%)",
    pos: [-1.8 * fac, 0, -0.3 * fac], rot: [0, Math.PI / 5, 0],
    name: "Jack Napier",
    id: "Jack",
    creator: "Jack",
    url: "/images/Jack.webp"
  },
  {
    clip: "polygon(0 0, 80% 0, 100% 100%, 0 100%)",
    pos: [-1.8 * fac, 0, -0.3 * fac], rot: [0, Math.PI / 5, 0],
    name: "Jon Fitch",
    id: "Fitch",
    creator: "Fitch",
    url: "/images/Fitch.webp"
  },
  {
    clip: "polygon(0 0, 90% 0, 80% 100%, 20% 100%)",
    pos: [-2.5 * fac, 0, .6 * fac], rot: [0, Math.PI / 3, 0],
    name: "Rollo Tomassi",
    id: "Rollo",
    creator: "Rollo",
    url: "/images/Rollo.webp"
  },
  {
    clip: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)",
    pos: [-3.5 * fac, 0, .75 * fac], rot: [0, Math.PI / 2.5, 0],
    name: "Stirling Cooper",
    id: "Stirling",
    creator: "Stirling",
    url: "/images/Stirling.webp"
  },
  // Right
  {
    clip: "polygon(0 0, 100% 0, 85% 100%, 10% 100%)",
    pos: [1.75 * fac, 0, 0.25 * fac], rot: [0, -Math.PI / 2.5, 0],
    name: "Rian Stone",
    id: "Rian",
    creator: "Rian",
    url: "/images/Stone.webp"
  },
  {
    clip: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)",
    pos: [2.15 * fac, 0, 1.5 * fac], rot: [0, -Math.PI / 2.5, 0],
    name: "Thor",
    id: "Thor",
    creator: "Thor",
    url: "/images/Thor.webp"
  },
  {
    clip: "polygon(0 0, 80% 0%, 100% 100%, 0 100%)",
    pos: [3 * fac, 0, 2.75 * fac], rot: [0, -Math.PI / 2.5, 0],
    name: "Paul Benjamin",
    id: "PaulBenjamin",
    creator: "Paul",
    url: "/images/Paul_Ben.webp"
  },
  {
    clip: "polygon(0 0, 100% 0, 100% 100%, 20% 100%)",
    pos: [3 * fac, 0, 2.75 * fac], rot: [0, -Math.PI / 2.5, 0],
    name: "Paul Bauer",
    id: "PaulBauer",
    creator: "Paul",
    url: "/images/Paul_CoMPodcast.webp"
  }
]