import gui from '../assets/google/gui.jpg'
import pipeline from '../assets/google/pipeline.gif'
import pipelineStill from '../assets/google/pipeline-still.jpg'
import bereal from '../assets/google/bereal.jpg'
import hero from '../assets/google/hero.jpg'
import workflow from '../assets/google/workflow.jpg'

export const IMAGES = { hero, bereal, gui, workflow, pipeline, pipelineStill }

export const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'design-process', label: 'Design Process' },
  { id: 'reflection', label: 'Reflection' },
]

export const META = [
  { label: 'Role', values: ['Product Designer', 'Product Engineer', 'LLM Prompting'] },
  { label: 'Timeline', values: ['Jan - Jun 2026'] },
  {
    label: 'Team',
    values: ['Carolyn Chen', 'Enrico Pratama', 'Eugene Wongso', 'Theophila Setiawan'],
  },
  {
    label: 'Skills',
    values: ['Google AI Studio', 'Python (+ Rich)', 'Figma', 'User Research', 'White Paper Report'],
  },
]

export const PROBLEM_STATS = [
  { figure: '30 min', caption: 'Avg. time per patch, manually' },
  { figure: '128x', caption: 'Android downstream versions tested' },
  { figure: '262', caption: 'Merge conflicts evaluated' },
]

export const PIPELINE_STAGES = [
  {
    title: 'Vanir Parser',
    body: 'Parses Vanir reports into structured format for pipeline processing.',
  },
  {
    title: 'Patch Adopter',
    body: 'Applies upstream diffs to downstream Android codebases for all vulnerabilities.',
  },
  {
    title: 'LLM',
    body: 'Fixes failed patches using code context and iterative refinement with agentic workflows.',
  },
  { title: 'Validation', body: 'Checks patch correctness via automated build and test.' },
]

/* Spans of a ten-column grid: the first row stops short, the second fills. */
export const METRICS = [
  { title: 'Length metrics', body: 'Characters, tokens, lines', span: 3 },
  { title: 'Edit distance', body: 'Token-level distance', span: 3 },
  {
    title: 'Similarity',
    body: 'Normalized edit similarity, cosine similarity, CodeBERT similarity.',
    span: 5,
  },
  { title: 'Manual handcheck', body: 'Human verification of patch correctness', span: 5 },
]

export const PRINCIPLES = [
  {
    n: '01',
    title: 'Transparency',
    body: 'Each stage surfaced what the system was doing and why: the CVE being processed, conflict type detected, model selected, strategy applied. Nothing happened off-screen.',
  },
  {
    n: '02',
    title: 'Familiar workflow',
    body: 'The stepper mirrored the mental model engineers already had for patch porting, a structured version of their existing process, not a new one to learn.',
  },
  {
    n: '03',
    title: 'Always oriented',
    body: 'A progress indicator at each card showed the exact step (4 of 8, 5 of 8) with status colors and timing, so engineers always knew what had finished, what was running, and what was next.',
  },
]

export const PIVOT = [
  {
    label: 'What we built',
    title: 'A GUI stepper',
    body: 'Checked every box. Transparent, familiar, always oriented. Engineers still had to leave their terminal to use it.',
  },
  {
    label: 'What shipped',
    title: 'A CLI',
    body: 'Same pipeline, same transparency, inside the environment they already trusted. The friction disappeared.',
  },
]
