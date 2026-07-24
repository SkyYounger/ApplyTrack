import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

function ApplicationChart({ applications }) {
    const data = [
        {
            name: "Applied",
            value: applications.filter(
                app => app.status === "applied"
            ).length,
        },
        {
            name: "Interviewing",
            value: applications.filter(
                app => app.status === "interviewing"
            ).length,
        },
        {
            name: "Offer",
            value: applications.filter(
                app => app.status === "offer"
            ).length,
        },
        {
            name: "Rejected",
            value: applications.filter(
                app => app.status === "rejected"
            ).length,
        },
    ]

    const COLORS = [
        "#22c55e",
        "#3b82f6",
        "#f97316",
        "#ef4444",
    ]

    return (
        <div className="card">
            <h2>Application Breakdown</h2>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={100}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={entry.name}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ApplicationChart