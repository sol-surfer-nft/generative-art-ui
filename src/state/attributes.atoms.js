import { atom, selector } from 'recoil'
import { nanoid } from "nanoid"

// Note: Traits are not currently connected by id to the uploads
/**
 * Use Array.splice() to maintain order?
 * `var data = [];
 * data[0] = "One";
 * data[1] = "Two";
 * data[2] = "Three";
 * data[3] = "Four";
 * data.splice(2, 0, "Custom");
 * console.log(data.join());`
 */

// Accumulate all the traits from all attributes into a single object array, copying over the parent attribute's id and name for its children traits
export const traitsState = selector({
  key: "traits",
  get: ({get}) => {
    const attributes = get(attributesState);
    const initialTraits = []

    return attributes.reduce((previous, current) => {
      return [...previous, current.map(currentAttribute => ({...currentAttribute.traits, attributeId: currentAttribute.id, attributeName: currentAttribute.name }))]
    }, initialTraits)
  }
})

export const attributesState = atom({
  key: "attributes",
  default: [
    {
      id: nanoid(6),
      name: "Background",
      // targetRarity?: 5
      // order?: 0
      traits: [
        {
          id: nanoid(6),
          name: "background-1",
          desc: "Solid black background for the basic bitches in the room", // optional
          rarity: 0.5, // add to 100%? decimals place? ints only?
          fileType: "png", // or "image/png" ?
          size: 235, // in bits, kb, or mb? Can this be derived or should be stored? Should this reflect any info in S3? In DB?
          url: "link-to-s3" // from DB
        },
        {
          id: nanoid(6),
          name: "background-2",
          rarity: 0.2,
          fileType: "jpeg",
          size: 10000,
          url: ""
        }

      ]
    },
    {
      id: nanoid(6),
      name: "Head",
      // targetRarity?: 5
      // order?: 1
      traits: [
        {
          id: nanoid(6),
          name: "background-1",
          desc: "Solid black background for the basic bitches in the room", // optional
          rarity: 0.5, // add to 100%? decimals place? ints only?
          fileType: "png", // or "image/png" ?
          size: 235, // in bits, kb, or mb? Can this be derived or should be stored? Should this reflect any info in S3? In DB?
          url: "link-to-s3" // from DB
        },
        {
          id: nanoid(6),
          name: "background-2",
          rarity: 0.2,
          fileType: "jpeg",
          size: 10000,
          url: ""
        }

      ]
    },
  ]
})