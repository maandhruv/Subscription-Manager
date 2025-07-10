import { useAuth } from "@/context/authContext";
import { calculateSubscriptionMetrics, subscriptions } from "@/utils"

const SubscriptionSummary = () => {
  const {userData} = useAuth();
  const summary = calculateSubscriptionMetrics(userData.subscriptions);
  //console.log(summary);
  const emojis = ['🔥', '✅', '⭐️', '⚡️', '🎉', '✨', '🏆', '🌼', '🌱', '🐛', '🐙', '🪼']
  return (
    <section>
      <h2>Subscription Analytics</h2>
      <div className="analytics-card">
        {Object.keys(summary).map((metric, metricIndex) => {
          return (
          <div key = {metricIndex} className="analytics-item">
            <p>{emojis[metricIndex]} {metric.replaceAll('_', ' ')}</p>
            <h4>{summary[metric]}</h4>
          </div>
          )
        })}
      </div>
    </section>
  )
}

export default SubscriptionSummary