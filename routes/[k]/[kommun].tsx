import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "kv/posts.ts";

export const handler: Handlers<string> = {
  GET(_req, ctx) {
    return ctx.render(ctx.params.kommun);
  },
};

export default function Test({ data }: PageProps) {
  return (
    <div class="mx-auto w-full max-w-3xl">
      <h1 class="mx-1 rounded-lg border border-primary bg-primary p-2 text-center font-mono text-4xl font-semibold uppercase shadow">
        {decodeURIComponent(data)}
      </h1>
      {POSTS.map((post) => <PostPreview key={post.id} post={post} />)}
    </div>
  );
}

function PostPreview({ post }: { post: Post }) {
  return (
    <div class="mx-1 my-3 rounded-lg border bg-base-200 p-4 shadow hover:bg-base-300">
      <h5 class="upp mb-2 text-2xl font-bold tracking-tight text-primary">{post.title}</h5>
      <p class="mb-1 text-xs font-normal">
        <span class="font-semibold text-info">{post.userName}</span>
      </p>
      <p class="mb-2 truncate font-light">
        {post.body}
      </p>
      <p class="text-xs italic">
        Posted on {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

// function PostPreview({ post }: { post: Post }) {
//   return (
//     <div className="my-5 w-full overflow-hidden rounded-xl bg-white shadow-md">
//       <div className="p-5">
//         <div className="mb-2 text-xl font-bold text-primary">{post.title}</div>
//         <div className="text-base text-gray-700">
//           <div className="leading-none text-gray-900">{post.userName}</div>
//           <div className="text-gray-600">{post.createdAt}</div>
//         </div>
//         <p className="mt-2 truncate text-sm text-gray-700">{post.body}</p>
//       </div>
//     </div>
//   );
//}

const POSTS: Post[] = [{
  "id": "b2e0b676-6de4-4faa-ac5a-593dd79147d9",
  "userName": "Nicolle Prewer",
  "userId": "74901f93-0ae8-4ce3-a490-1a46f44ea659",
  "title": "Keylex",
  "body":
    "imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in",
  "city": "Guapimirim",
  "createdAt": "5/4/2024",
  "updatedAt": "2/18/2024",
}, {
  "id": "ce08f199-a601-424b-b30d-1af7559ebca4",
  "userName": "Donica Sawbridge",
  "userId": "3cb1de15-b054-4e6e-b646-cc376929c07b",
  "title": "Redhold",
  "body":
    "id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam",
  "city": "Luoxi",
  "createdAt": "7/3/2023",
  "updatedAt": "8/14/2023",
}, {
  "id": "785656da-aa80-428c-97b3-c228f771278b",
  "userName": "Elwin Bloxsome",
  "userId": "84bd5e60-0879-4315-a3b3-01e900c605c4",
  "title": "Job",
  "body":
    "in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis",
  "city": "Miastków Kościelny",
  "createdAt": "9/5/2023",
  "updatedAt": "5/21/2023",
}, {
  "id": "9bb305f5-efa6-4ef7-8617-caec87687936",
  "userName": "Cristionna Giberd",
  "userId": "420cdfd6-c6c6-450a-8263-eecab9b61db1",
  "title": "Zontrax",
  "body":
    "morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue",
  "city": "Liancheng",
  "createdAt": "12/8/2023",
  "updatedAt": "2/29/2024",
}, {
  "id": "27255526-7e10-492d-aa4a-6a24f52200b0",
  "userName": "Kerwinn MacKeig",
  "userId": "8eb1a1b0-3337-4613-a6ca-94fff908f6e0",
  "title": "Tempsoft",
  "body":
    "aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula",
  "city": "Tomari",
  "createdAt": "11/28/2023",
  "updatedAt": "11/8/2023",
}, {
  "id": "316c3d1c-e43f-46fc-a012-4f54d681cd5f",
  "userName": "Zilvia Frowd",
  "userId": "1ffb121a-65f6-456a-bf68-2715dda987c3",
  "title": "Overhold",
  "body":
    "ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu",
  "city": "Kozje",
  "createdAt": "1/10/2024",
  "updatedAt": "8/27/2023",
}, {
  "id": "8395d1ed-7691-4cf7-922f-900d8bd6ecb5",
  "userName": "Hermie Cashmore",
  "userId": "3d44fc11-e7a5-4c1c-8d01-998d26adae90",
  "title": "Sonsing",
  "body":
    "parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus",
  "city": "Estaca",
  "createdAt": "6/29/2023",
  "updatedAt": "8/11/2023",
}, {
  "id": "996dd8cd-2134-4a66-b656-15986d6f5bff",
  "userName": "Porty Vannoni",
  "userId": "40616bbe-f8cd-43ef-bec1-a1c8bec039ee",
  "title": "Zaam-Dox",
  "body":
    "vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis",
  "city": "Khatsyezhyna",
  "createdAt": "5/23/2023",
  "updatedAt": "6/4/2023",
}, {
  "id": "4c6f014f-54be-47d6-b1b3-f69c474fa80f",
  "userName": "Sephira Pessolt",
  "userId": "c255dc7d-0242-40fc-8870-ce4158d34ee5",
  "title": "Otcom",
  "body":
    "id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse",
  "city": "Las Flores",
  "createdAt": "8/15/2023",
  "updatedAt": "3/30/2024",
}, {
  "id": "aaaaa73a-2493-4c83-bff8-720bcdae8136",
  "userName": "Netti Euels",
  "userId": "b66976c1-5b9d-4ea4-bcb7-98a365e5dc50",
  "title": "Y-Solowarm",
  "body":
    "ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus",
  "city": "Kiambu",
  "createdAt": "1/11/2024",
  "updatedAt": "4/21/2024",
}, {
  "id": "7a6395b5-bb75-43e3-b2ac-3994dba76dc4",
  "userName": "Ax Barkus",
  "userId": "bc95500e-05f3-4bd3-b3fa-39576113f913",
  "title": "Daltfresh",
  "body":
    "nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo",
  "city": "Guayaramerín",
  "createdAt": "5/31/2023",
  "updatedAt": "8/17/2023",
}, {
  "id": "2dfeca69-799e-4358-a659-d05d8bbb2447",
  "userName": "Nessie McAlinion",
  "userId": "75906800-7e3e-4764-858b-978ec5894da9",
  "title": "Cardguard",
  "body":
    "quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit",
  "city": "Syanno",
  "createdAt": "8/30/2023",
  "updatedAt": "9/9/2023",
}, {
  "id": "d30eff5f-1403-454d-b77a-4de5d1b53491",
  "userName": "Sylvia Unwin",
  "userId": "2b28f01b-5da0-421a-83c6-0fc795b78b52",
  "title": "Asoka",
  "body":
    "cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis",
  "city": "Fuzhiping",
  "createdAt": "7/8/2023",
  "updatedAt": "4/27/2024",
}, {
  "id": "acf73cc1-b5af-4de2-828b-04d38b1f5fb2",
  "userName": "Spenser Stritton",
  "userId": "7acaa4ac-49e6-4480-9b0f-8d1a0dc339b9",
  "title": "Aerified",
  "body":
    "tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed",
  "city": "Santa Cruz Cabrália",
  "createdAt": "4/7/2024",
  "updatedAt": "6/8/2023",
}, {
  "id": "4be4b11d-fe2d-45c5-9115-ed3a34df8e25",
  "userName": "Albie Kaes",
  "userId": "a2c4f93b-00ac-4327-97cd-3b5476627080",
  "title": "Holdlamis",
  "body":
    "ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum",
  "city": "Trondheim",
  "createdAt": "12/3/2023",
  "updatedAt": "12/24/2023",
}, {
  "id": "808dcc2e-3058-420c-9cf9-aad1abf2576a",
  "userName": "Glori Storry",
  "userId": "be729d84-f4de-4bd0-bac1-33be93ce0542",
  "title": "Trippledex",
  "body":
    "mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc",
  "city": "Maïné Soroa",
  "createdAt": "8/28/2023",
  "updatedAt": "9/24/2023",
}, {
  "id": "b511deaf-4bb6-4b78-a31b-3ef85d6bd393",
  "userName": "Clayton Kunat",
  "userId": "cd8d8feb-81e1-4a7a-8789-e8eb8d879405",
  "title": "Duobam",
  "body":
    "feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in",
  "city": "Cilaja",
  "createdAt": "6/24/2023",
  "updatedAt": "11/1/2023",
}, {
  "id": "2a7b65a9-cb6e-48ae-96e8-ad494d0db82c",
  "userName": "See Essberger",
  "userId": "b716a6aa-6894-4e17-bcd3-dbc810921ae4",
  "title": "Pannier",
  "body":
    "sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque",
  "city": "Xinhua",
  "createdAt": "5/6/2024",
  "updatedAt": "8/6/2023",
}, {
  "id": "3b7c2e22-9da6-422f-afa1-8a499479c35f",
  "userName": "Olympe Cecere",
  "userId": "88c4e530-4c50-4b1e-8b8a-649a993bf2f4",
  "title": "Andalax",
  "body":
    "tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis",
  "city": "Livorno",
  "createdAt": "7/29/2023",
  "updatedAt": "9/27/2023",
}, {
  "id": "0499292c-1f39-4992-816e-fb6c34ab95db",
  "userName": "Skye Hanlon",
  "userId": "bd7e8899-fb39-4875-8e4d-93fefc1dae9e",
  "title": "Duobam",
  "body":
    "platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget",
  "city": "Brooklyn",
  "createdAt": "4/8/2024",
  "updatedAt": "10/20/2023",
}];
