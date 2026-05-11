// 1. Supabase 연결 정보
const SUPABASE_URL = "https://wmfnocscxotsxwcythol.supabase.co";
const SUPABASE_KEY = "sb_publishable_1wx_tYqr6B0_02cVfy0NhA_qahYS2a3";

// 2. Supabase 연결
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 3. 현재 로그인한 사용자 저장
let currentUser = null;

// 4. 현재 로그인 상태 확인
async function checkUser() {
  const { data } = await supabaseClient.auth.getUser();

  currentUser = data.user;

  if (currentUser) {
    document.querySelector("#userInfo").textContent =
      "로그인 상태: " + currentUser.email;
  } else {
    document.querySelector("#userInfo").textContent =
      "로그인 상태: 로그아웃";
  }
}

// 5. 회원가입
async function signUp() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const { error } = await supabaseClient.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    alert("회원가입 실패: " + error.message);
    return;
  }

  alert("회원가입 성공! 이메일 인증이 필요할 수 있어요.");
}

// 6. 로그인
async function login() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const { error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    alert("로그인 실패: " + error.message);
    return;
  }

  alert("로그인 성공!");
  await checkUser();
  await readPosts();
}

// 7. 로그아웃
async function logout() {
  await supabaseClient.auth.signOut();

  currentUser = null;
  document.querySelector("#userInfo").textContent = "로그인 상태: 로그아웃";

  alert("로그아웃 성공!");
}

// 8. 게시글 작성 Create
async function createPost() {
  if (!currentUser) {
    alert("로그인한 사용자만 글을 작성할 수 있습니다.");
    return;
  }

  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;

  if (title === "" || content === "") {
    alert("제목과 내용을 입력하세요.");
    return;
  }

  const { error } = await supabaseClient
    .from("posts")
    .insert({
      title: title,
      content: content,
      user_id: currentUser.id
    });

  if (error) {
    alert("글 작성 실패: " + error.message);
    return;
  }

  alert("글 작성 완료!");

  document.querySelector("#title").value = "";
  document.querySelector("#content").value = "";

  readPosts();
}

// 9. 게시글 조회 Read
async function readPosts() {
  const { data, error } = await supabaseClient
    .from("posts")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    alert("글 조회 실패: " + error.message);
    return;
  }

  const postList = document.querySelector("#postList");
  postList.innerHTML = "";

  data.forEach(function(post) {
    const postBox = document.createElement("div");
    postBox.className = "post";

    postBox.innerHTML = `
      <p class="post-title">${post.title}</p>
      <p>${post.content}</p>
      <button onclick="updatePost(${post.id})">수정</button>
      <button onclick="deletePost(${post.id})">삭제</button>
    `;

    postList.appendChild(postBox);
  });
}

// 10. 게시글 수정 Update
async function updatePost(postId) {
  const newTitle = prompt("수정할 제목을 입력하세요.");
  const newContent = prompt("수정할 내용을 입력하세요.");

  if (!newTitle || !newContent) {
    alert("제목과 내용을 모두 입력해야 합니다.");
    return;
  }

  const { error } = await supabaseClient
    .from("posts")
    .update({
      title: newTitle,
      content: newContent
    })
    .eq("id", postId);

  if (error) {
    alert("수정 실패: " + error.message);
    return;
  }

  alert("수정 완료!");
  readPosts();
}

// 11. 게시글 삭제 Delete
async function deletePost(postId) {
  const check = confirm("정말 삭제하시겠습니까?");

  if (!check) {
    return;
  }

  const { error } = await supabaseClient
    .from("posts")
    .delete()
    .eq("id", postId);

  if (error) {
    alert("삭제 실패: " + error.message);
    return;
  }

  alert("삭제 완료!");
  readPosts();
}

// 12. 페이지 처음 열릴 때 실행
checkUser();
readPosts();