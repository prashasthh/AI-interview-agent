interface FeedbackReportProps {
  data: {
    roleFit?: {
      score?: number;
      summary?: string;
    };
    answerAnalysis?: Array<{
      question?: string;
      strengths?: string[];
      gaps?: string[];
    }>;
    resumeFeedback?: {
      bulletImprovements?: Array<{
        current?: string;
        improved?: string;
        reason?: string;
      }>;
    };
    hireLikelihood?: {
      decision?: string;
      reasoning?: string;
    };
  };
}

export default function FeedbackReport({ data }: FeedbackReportProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <section>
        <h2 className="text-2xl font-semibold">Role Fit</h2>
        <p className="text-green-400 text-lg">
          {data.roleFit?.score ?? '-'} /100
        </p>
        <p className="text-gray-300">{data.roleFit?.summary ?? '-'}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Answer Analysis</h2>
        {Array.isArray(data.answerAnalysis) && data.answerAnalysis.length > 0 ? (
          data.answerAnalysis.map((a, i) => (
            <div key={i} className="border border-white/10 p-4 mt-4 rounded-lg">
              <p className="font-medium">{a.question ?? '-'}</p>

              <p className="text-green-400 mt-2">Strengths</p>
              <ul className="list-disc ml-6">
                {Array.isArray(a.strengths) && a.strengths.length > 0 ? (
                  a.strengths.map((s, j) => <li key={j}>{s}</li>)
                ) : (
                  <li>-</li>
                )}
              </ul>

              <p className="text-red-400 mt-2">Gaps</p>
              <ul className="list-disc ml-6">
                {Array.isArray(a.gaps) && a.gaps.length > 0 ? (
                  a.gaps.map((g, j) => <li key={j}>{g}</li>)
                ) : (
                  <li>-</li>
                )}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No answer analysis available.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Resume Improvements</h2>
        {Array.isArray(data.resumeFeedback?.bulletImprovements) && data.resumeFeedback?.bulletImprovements.length > 0 ? (
          data.resumeFeedback.bulletImprovements.map((b, i) => (
            <div key={i} className="bg-white/5 p-4 mt-4 rounded-lg">
              <p className="text-gray-400">Current</p>
              <p>{b.current ?? '-'}</p>

              <p className="text-gray-400 mt-2">Improved</p>
              <p className="text-green-300">{b.improved ?? '-'}</p>

              <p className="text-gray-400 text-sm mt-1">{b.reason ?? '-'}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No resume improvements available.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Hiring Decision</h2>
        <p className="text-lg">{data.hireLikelihood?.decision ?? '-'}</p>
        <p className="text-gray-300">{data.hireLikelihood?.reasoning ?? '-'}</p>
      </section>
    </div>
  );
}
