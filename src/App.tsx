import {Component, createSignal, For, Show} from "solid-js";
import logo from "./logo.svg";
import styles from "./App.module.css";

type Rotation = {
  start_time: number;
  rule: { name: string; };
}

type Schedules = {
  gachi: Array<Rotation>;
  league: Array<Rotation>;
}

type ScheduleProps = {
  schedules: Schedules
}
const Schedule: Component<ScheduleProps> = (props) => {
  const gachi = props.schedules.gachi.slice(0, 4);
  const startTimes = gachi.map(rotation => new Date(rotation.start_time * 1000))
  const league = props.schedules.league.slice(0, 4);
  return (<main className="container mx-auto">
    <div className="grid grid-cols-schedule">
      <div />
      <For each={startTimes}>{t => <div>{t.toLocaleTimeString()}</div>}</For>
      <div>Ranked Battle</div>
      <For each={gachi}>{rotation => <div>{rotation.rule.name}</div>}</For>
      <div>League Battle</div>
      <For each={league}>{rotation => <div>{rotation.rule.name}</div>}</For>
    </div>
  </main>)
}

const Loading: Component = () => {
  return <main className="w-full">
    <img src={logo} className={`mx-auto ${styles.logo}`} alt="logo" />
  </main>
}

const App: Component = () => {
  const [getSchedules, setSchedules] = createSignal<Schedules>();

  fetch('https://splatoon2.ink/data/schedules.json').then(res => res.json()).then(data => setSchedules(data));

  return <Show when={getSchedules()} fallback={<Loading />}><Schedule schedules={getSchedules() as Schedules} /></Show>;
};

export default App;
