const fac = 10

// const pexel = (id:any) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
export const images = [
  // Front
  // { position: [0, 0, 1.5 * fac], rotation: [0, 0, 0], url: "/images/robot.png" },
  // Back
  { pos: [-0.8* fac, 0, -0.6* fac], rot: [0, 0, 0], 
    creator: "Troy",
    url: "/images/Troy.jpg" },
  { pos: [0.8* fac, 0, -0.6* fac], rot: [0, 0, 0],
    creator: "Aaron",
    url: "/images/Aaron.jpg" },
  // Left
  { pos: [-1.8* fac, 0, -0.3* fac], rot: [0, Math.PI / 5, 0], 
    creator: "Fitch",
  url: "/images/Fitch.jpg" },
  { pos: [-2.5* fac, 0, .6* fac], rot: [0, Math.PI / 3, 0], 
    creator: "Rollo",
  url: "/images/Rollo.jpg" },
  { pos: [-3.5* fac, 0, .75* fac], rot: [0, Math.PI / 2.5, 0], 
    creator: "Stirling",
  url: "/images/Stirling.jpg"  },
  // Right
  { pos: [1.75* fac, 0, 0.25* fac], rot: [0, -Math.PI / 2.5, 0], 
    creator: "Rian",
  url: "/images/Stone.jpg"  },
  { pos: [2.15* fac, 0, 1.5* fac], rot: [0, -Math.PI / 2.5, 0], 
    creator: "Thor",
  url: "/images/Thor.jpg"  },
  { pos: [3* fac, 0, 2.75* fac], rot: [0, -Math.PI / 2.5, 0], 
    creator: "Paul",
  url: "/images/Paul_Ben.jpg"  },
  { pos: [3* fac, 0, 2.75* fac], rot: [0, -Math.PI / 2.5, 0], 
  creator: "Paul",
url: "/images/Paul_CoMPodcast.jpg"  }
  ]