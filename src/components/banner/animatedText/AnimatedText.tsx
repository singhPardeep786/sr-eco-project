import { TextSlider } from "@/components/ui/text-slider"

export function AnimatedText() {
  return (
    <div className="flex flex-col text-4xl md:text-5xl lg:text-7xl">
      <TextSlider start="top 90%" end="top" duration={0.5} translateX={-10}>
        <div>
          <h1 className="uppercase text-[var(--blue)]">introducing</h1>
        </div>
      </TextSlider>
      <TextSlider
        start="top 90%"
        end="top"
        popFrom="up"
        duration={0.5}
        translateX={10}
      >
        <span className="text-white uppercase">sr eco park</span>
      </TextSlider>
    </div>
  )
}
