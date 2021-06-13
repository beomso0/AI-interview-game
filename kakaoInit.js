Kakao.init('6333c91993e2de2d010abe50782ca8d0');
console.log(Kakao.isInitialized());
let urlForImg;
let kakaoM = {
    objectType: 'feed',
    content: {
      title: 'AI 사회생활 테스트',
      description: '직장에서 진짜 필요한 능력은 이런 거 아니야? 사회생활 능력 테스트!',
      imageUrl: 'https://ibb.co/f4pyPL0',
      link: {
        webUrl: 'https:///shsh.live',
      },
    },
    buttons: [
      {
        title: '웹으로 보기',
        link: {
          webUrl: 'https://shsh.live'
        },
      }     
    ]
  }


