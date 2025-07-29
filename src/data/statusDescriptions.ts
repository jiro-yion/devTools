export const statusDescriptions = {
  ko: {
    "100": "Continue – 요청의 일부를 받았으며 나머지를 계속 보내도 됩니다.",
    "101": "Switching Protocols – 프로토콜 전환을 요청받아 수행합니다.",
    "102": "Processing – 서버가 요청을 처리 중입니다.", // 추가
    "200": "OK – 요청이 성공적으로 완료되었습니다.",
    "201": "Created – 새로운 리소스가 성공적으로 생성되었습니다.",
    "202": "Accepted – 요청이 접수되었지만 아직 처리되지 않았습니다.",
    "203": "Non-Authoritative Information – 비공식 정보입니다.", // 추가
    "204": "No Content – 요청은 성공했지만 반환할 콘텐츠가 없습니다.",
    "205": "Reset Content – 콘텐츠를 초기화하세요.", // 추가
    "206": "Partial Content – 부분적인 콘텐츠를 반환합니다.", // 추가
    "207": "Multi-Status – 여러 상태를 반환합니다.", // 추가
    "301": "Moved Permanently – 요청한 리소스가 영구적으로 이동되었습니다.",
    "302": "Found – 요청한 리소스가 임시로 다른 위치에 있습니다.",
    "303": "See Other – 다른 URI를 참조하세요.", // 추가
    "304": "Not Modified – 리소스가 수정되지 않았습니다.",
    "307": "Temporary Redirect – 임시 리디렉션입니다.", // 추가
    "308": "Permanent Redirect – 영구 리디렉션입니다.", // 추가
    "400": "Bad Request – 잘못된 요청입니다.",
    "401": "Unauthorized – 인증이 필요합니다.",
    "402": "Payment Required – 결제가 필요합니다.", // 추가
    "403": "Forbidden – 서버가 요청을 거부했습니다.",
    "404": "Not Found – 요청한 리소스를 찾을 수 없습니다.",
    "405": "Method Not Allowed – 요청한 메서드는 허용되지 않습니다.",
    "406": "Not Acceptable – 요청한 콘텐츠를 제공할 수 없습니다.", // 추가
    "408": "Request Timeout – 요청 시간이 초과되었습니다.", // 추가
    "409": "Conflict – 요청이 현재 상태와 충돌합니다.",
    "410": "Gone – 리소스가 더 이상 존재하지 않습니다.", // 추가
    "415": "Unsupported Media Type – 지원하지 않는 미디어 타입입니다.", // 추가
    "418": "I'm a teapot – 티팟입니다.", // 추가 (재미용)
    "422": "Unprocessable Entity – 처리할 수 없는 엔티티입니다.", // 추가
    "426": "Upgrade Required – 업그레이드가 필요합니다.", // 추가
    "429": "Too Many Requests – 너무 많은 요청을 보냈습니다.",
    "500": "Internal Server Error – 서버에 오류가 발생했습니다.",
    "501": "Not Implemented – 서버가 기능을 구현하지 않았습니다.",
    "502": "Bad Gateway – 잘못된 게이트웨이 응답입니다.",
    "503": "Service Unavailable – 서버가 일시적으로 사용할 수 없습니다.",
    "504": "Gateway Timeout – 게이트웨이 시간 초과입니다.", // 추가
    "505": "HTTP Version Not Supported – 지원하지 않는 HTTP 버전입니다.", // 추가
  },
  en: {
    "100":
      "Continue – The server has received part of the request and is waiting for the rest.",
    "101":
      "Switching Protocols – The server is switching protocols as requested.",
    "102": "Processing – The server is processing the request.", // 추가
    "200": "OK – The request has succeeded.",
    "201": "Created – The resource has been created successfully.",
    "202": "Accepted – The request has been accepted but not yet processed.",
    "203":
      "Non-Authoritative Information – Returned meta information is from a local copy.", // 추가
    "204":
      "No Content – The request succeeded, but there is no content to return.",
    "205": "Reset Content – Reset the document view.", // 추가
    "206": "Partial Content – The server is delivering partial content.", // 추가
    "207": "Multi-Status – Multiple status codes returned.", // 추가
    "301":
      "Moved Permanently – The requested resource has been permanently moved.",
    "302": "Found – The requested resource is temporarily located elsewhere.",
    "303": "See Other – See another URI.", // 추가
    "304": "Not Modified – The resource has not been modified.",
    "307":
      "Temporary Redirect – The resource temporarily resides under a different URI.", // 추가
    "308":
      "Permanent Redirect – The resource is now permanently located elsewhere.", // 추가
    "400": "Bad Request – The request could not be understood by the server.",
    "401": "Unauthorized – Authentication is required.",
    "402": "Payment Required – Payment is required.", // 추가
    "403": "Forbidden – The server refused to fulfill the request.",
    "404": "Not Found – The requested resource could not be found.",
    "405": "Method Not Allowed – The method is not allowed for this resource.",
    "406": "Not Acceptable – The requested resource is not acceptable.", // 추가
    "408": "Request Timeout – The server timed out waiting for the request.", // 추가
    "409":
      "Conflict – The request conflicts with the current state of the resource.",
    "410": "Gone – The requested resource is no longer available.", // 추가
    "415": "Unsupported Media Type – The media type is not supported.", // 추가
    "418": "I'm a teapot – The server is a teapot.", // 추가 (재미용)
    "422":
      "Unprocessable Entity – The server understands the content but was unable to process it.", // 추가
    "426": "Upgrade Required – Upgrade to a different protocol is required.", // 추가
    "429": "Too Many Requests – Too many requests sent in a given time.",
    "500": "Internal Server Error – The server encountered an error.",
    "501":
      "Not Implemented – The server does not support the requested functionality.",
    "502": "Bad Gateway – Invalid response from the upstream server.",
    "503": "Service Unavailable – The server is temporarily unavailable.",
    "504": "Gateway Timeout – The gateway timed out.", // 추가
    "505": "HTTP Version Not Supported – The HTTP version is not supported.", // 추가
  },
  ja: {
    "100":
      "Continue – サーバーはリクエストの一部を受信し、残りを待っています。",
    "101":
      "Switching Protocols – サーバーが要求に応じてプロトコルを切り替えます。",
    "102": "Processing – サーバーがリクエストを処理中です。", // 추가
    "200": "OK – リクエストが正常に完了しました。",
    "201": "Created – 新しいリソースが正常に作成されました。",
    "202": "Accepted – リクエストは受理されましたが、まだ処理されていません。",
    "203": "Non-Authoritative Information – 信頼できない情報です。", // 추가
    "204":
      "No Content – リクエストは成功しましたが、返すコンテンツがありません。",
    "205": "Reset Content – 表示をリセットしてください。", // 추가
    "206": "Partial Content – 部分的なコンテンツを返します。", // 추가
    "207": "Multi-Status – 複数の状態を返します。", // 추가
    "301": "Moved Permanently – 要求されたリソースは恒久的に移動されました。",
    "302": "Found – 要求されたリソースは一時的に別の場所にあります。",
    "303": "See Other – 他のURIを参照してください。", // 추가
    "304": "Not Modified – リソースは変更されていません。",
    "307": "Temporary Redirect – 一時的にリダイレクトされました。", // 추가
    "308": "Permanent Redirect – 永続的にリダイレクトされました。", // 추가
    "400": "Bad Request – 無効なリクエストです。",
    "401": "Unauthorized – 認証が必要です。",
    "402": "Payment Required – 支払いが必要です。", // 추가
    "403": "Forbidden – サーバーがリクエストを拒否しました。",
    "404": "Not Found – リクエストしたリソースが見つかりません。",
    "405":
      "Method Not Allowed – リクエストされたメソッドは許可されていません。",
    "406": "Not Acceptable – 要求されたコンテンツを提供できません。", // 추가
    "408": "Request Timeout – リクエストのタイムアウトです。", // 추가
    "409": "Conflict – リクエストが現在の状態と衝突しています。",
    "410": "Gone – リソースはもう存在しません。", // 추가
    "415": "Unsupported Media Type – サポートされていないメディアタイプです。", // 추가
    "418": "I'm a teapot – ティーポットです。", // 추가 (ジョーク)
    "422": "Unprocessable Entity – 処理できないエンティティです。", // 추가
    "426": "Upgrade Required – アップグレードが必要です。", // 추가
    "429": "Too Many Requests – 短時間にリクエストを送りすぎました。",
    "500": "Internal Server Error – サーバーでエラーが発生しました。",
    "501": "Not Implemented – サーバーは要求された機能をサポートしていません。",
    "502": "Bad Gateway – 不正なゲートウェイ応答です。",
    "503": "Service Unavailable – サーバーを一時的に利用できません。",
    "504": "Gateway Timeout – ゲートウェイのタイムアウトです。", // 추가
    "505":
      "HTTP Version Not Supported – サポートされていないHTTPバージョンです。", // 추가
  },
};
