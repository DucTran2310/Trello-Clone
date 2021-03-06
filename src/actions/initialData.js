export const initialData = {
  boards: [
    {
      id: 'board-1',
      columnOrder: ['column-2', 'column-3', 'column-1'],
      columns: [
        {
          id: 'column-1',
          boardId: 'board-1',
          title: 'To do column',
          cardOrder: [
            'card-7',
            'card-2',
            'card-3',
            'card-4',
            'card-5',
            'card-6',
            'card-1'
          ],
          cards: [
            {
              id: 'card-1',
              boardId: 'board-1',
              column: 'column-1',
              title: 'Title of card 1',
              cover: 'https://media.istockphoto.com/photos/delicious-meal-picture-id1295387240?b=1&k=20&m=1295387240&s=170667a&w=0&h=KtWYFjSBgpNgVkE3P-WKZ2F6V-VxyUBBtJIP_k8IANM='
            },
            {
              id: 'card-2',
              boardId: 'board-1',
              column: 'column-1',
              title: 'Title of card 2',
              cover: null
            },
            {
              id: 'card-3',
              boardId: 'board-1',
              column: 'column-1',
              title: 'Title of card 3',
              cover: null
            },
            {
              id: 'card-4',
              boardId: 'board-1',
              column: 'column-1',
              title: 'Title of card 4',
              cover: null
            },
            {
              id: 'card-5',
              boardId: 'board-1',
              column: 'column-1',
              title: 'Title of card 5',
              cover: null
            },
            {
              id: 'card-6',
              boardId: 'board-1',
              column: 'column-1',
              title: 'Title of card 6',
              cover: null
            },
            {
              id: 'card-7',
              boardId: 'board-1',
              column: 'column-1',
              title: 'Title of card 7',
              cover: null
            }
          ]
        },
        {
          id: 'column-2',
          boardId: 'board-1',
          title: 'Do homework',
          cardOrder: ['card-8', 'card-9', 'card-10'],
          cards: [
            {
              id: 'card-8',
              boardId: 'board-1',
              column: 'column-1',
              title: 'Title of card 8',
              cover: null
            },
            {
              id: 'card-9',
              boardId: 'board-1',
              column: 'column-1',
              title: 'Title of card 9',
              cover: null
            },
            {
              id: 'card-10',
              boardId: 'board-1',
              column: 'column-1',
              title: 'Title of card 10',
              cover: null
            }
          ]
        },
        {
          id: 'column-3',
          boardId: 'board-1',
          title: 'Sing a song',
          cardOrder: ['card-11', 'card-12', 'card-13', 'card-14'],
          cards: [
            {
              id: 'card-11',
              boardId: 'board-1',
              column: 'column-1',
              title: 'Title of card 11',
              cover: null
            },
            {
              id: 'card-12',
              boardId: 'board-1',
              column: 'column-1',
              title: 'Title of card 12',
              cover: null
            },
            {
              id: 'card-13',
              boardId: 'board-1',
              column: 'column-1',
              title: 'Title of card 13',
              cover: null
            },
            {
              id: 'card-14',
              boardId: 'board-1',
              column: 'column-1',
              title: 'Title of card 14',
              cover: null
            }
          ]
        }
      ]
    }
  ]
}
