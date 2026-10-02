import lr08 from '../assets/luckruns/lr08.jpg'

/*
  Nine fragrances. The name carries the moment — a time of day, a mood, often a
  place — and the notes it's built from sit under it.

  A bottle render goes in `image`; without one the entry falls back to a grey
  slot, so the collection can fill in one fragrance at a time.
*/
export const FRAGRANCES = [
  { id: 'lr01', name: 'LR 01 - A wet coastal noon, Maui', notes: 'Sea Breeze, Pineapple, Pine Needle, Vetiver.' },
  { id: 'lr02', name: 'LR 02 - Misty dawn, sacred, and smoky', notes: 'Pine Needle, Frankincense, Cedarwood' },
  { id: 'lr03', name: 'LR 03 - Spring noon, tender and fleeting', notes: 'Lychee, Cherry Blossom, Musk' },
  { id: 'lr04', name: 'LR 04 - Late afternoon, warm and intimate, NYC', notes: 'Neroli, Chocolate, Tonka Bean, Amber' },
  { id: 'lr05', name: 'LR 05 - Ceremonial morning, boozy floral, Boston', notes: 'Blackcurrant, Aldehydes, Lily, Oud' },
  { id: 'lr06', name: 'LR 06 - Early morning, dewy and quiet, Italy', notes: 'Lemon, Aldehydes, White Tea, White Musk' },
  { id: 'lr07', name: 'LR 07 - The hour before sunset, sensual, coastal', notes: 'Bergamot, Sea Salt, Mint, Geranium, Amber' },
  { id: 'lr08', name: 'LR 08 - Early morning, dark floral and intimate', notes: 'Black Dahlia Tulip, Magnolia, White Tea, Bergamot', image: lr08 },
  { id: 'lr09', name: 'LR 09 - Deep night, warm, and quiet, Bali', notes: 'Coconut, Chamomile, Dahlia, Sandalwood' },
]
