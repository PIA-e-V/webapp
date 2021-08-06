export default function () {
  return {
    id: 1,
    description: 'Das Werbeverbot für Schwangerschaftsabbrüche soll aufgehoben werden.',
    vote_date: '2019-02-21',
    topic: {
      id: 1,
      name: 'Sozialrecht'
    },
    explanation: {
      id: 1,
      description: 'Laut Paragraf 219a des Strafgesetzbuches ist es nicht erlaubt, für den Abbruch einer Schwangerschaft zu werben. Es besteht also ein sogenanntes Werbeverbot.<br><br>Die Kritik am Werbeverbot ist, dass es nicht nur werbende Handlungen strafbar macht. Ärzt:innen ist es auch verboten, sachliche Informationen über legale Wege für einen Schwangerschaftsabbruch zu veröffentlichen (z.B. auf der Homepage). Deshalb sieht der Gesetzesvorschlag vor, dass der Paragraf 219a gestrichen wird. Dann wäre es Ärzt:innen erlaubt, öffentlich über Schwangerschaftsabbrüche zu informieren.<br><br>Auf Basis des Paragrafen 219a wurde im Jahr 2017 eine Ärztin aus Gießen zu einer Geldstrafe verurteilt. Sie hatte auf ihrer Internetseite darauf hingewiesen, dass sie Schwangerschaftsabbrüche vornimmt. Sie hatte auch über die Methoden aufgeklärt, die sie anwendet.<br><br>Durch die Streichung des Paragrafen soll somit klarer geregelt werden, was Ärzt:innen dürfen und was nicht. Außerdem soll Frauen der Zugang zu sachlichen Informationen erleichtert werden.',
      source: 'Plenarsitzung (https://quelle.de)'
    },
    arguments: [
      {
        id: 1,
        description: 'Das Werbeverbot soll bestehen bleiben, denn es handelt sich bei einem Schwangerschaftsabbruch um das Beenden von Leben. Es ist keine ärztliche Handlung wie jede andere.',
        references: [
          {
            id: 1,
            type: 'PARTY',
            name: 'CDU',
            source: 'Plenarsitzung (https://quelle.de)'
          },
          {
            id: 1,
            type: 'PERSON',
            name: 'Ulla Schmidt',
            source: 'Plenarsitzung (https://quelle.de)',
            party: {
              id: 2,
              name: 'SPD'
            }
          }
        ],
        // Calculated from references
        parties: [
          { id: 1, name: 'CDU' },
          { id: 2, name: 'SPD' }
        ],
        // Calculated from references
        people: [
          { id: 1, name: 'Ulla Schmidt', party: { id: 2, name: 'SPD' } }
        ]
      },
      {
        id: 2,
        description: 'Das Werbeverbot soll bleiben, das Gesetz dazu muss aber ergänzt werden. Durch den Zusatz muss es Ärzt:innen erlaubt werden, darüber zu informieren, dass sie einen Schwangerschaftsabbruch durchführen. Weitere Informationen sollen Frauen auf staatlichen Seiten finden. Denn dort lässt sich die Qualität der Informationen überprüfen.',
        references: [
          {
            id: 1,
            type: 'PARTY',
            name: 'CDU',
            source: 'Plenarsitzung (https://quelle.de)'
          },
          {
            id: 2,
            type: 'PARTY',
            name: 'SPD',
            source: 'Plenarsitzung (https://quelle.de)'
          }
        ]
      }
    ]
  }
}
