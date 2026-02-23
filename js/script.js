// ===== Section Map (섹션 설명 기반 매칭) =====
const SECTION_MAP = [
    {
        id: 'sec-five-keys',
        title: 'AI 프롬프트 작성의 5가지 열쇠',
        description: '명확한 지시(Point of View), 배경 정보 제공(Context), 샘플 보여주기, 업무 쪼개기, AI를 파트너로 대하기. 프롬프트 작성의 기본 원칙, 좋은 질문과 나쁜 질문의 차이, Before-After 비교.'
    },
    {
        id: 'sec-prompt-types',
        title: '프롬프트의 3가지 유형 (서술형, 지침형, 함수형)',
        description: '상황 설명이 필요할 때(서술형), 단계별 규칙이나 절차를 지시할 때(지침형), 입력-출력 형식을 고정하여 반복 사용할 때(함수형). 기본적인 프롬프트 작성법, AI에게 처음 질문하는 방법, 업무 자동화 템플릿 만들기.'
    },
    {
        id: 'sec-shot-prompting',
        title: '제로샷, 원샷, 퓨샷 프롬프팅',
        description: '예시 없이 바로 질문(제로샷), 예시 1개로 형식 안내(원샷), 예시 여러 개로 패턴 학습 유도(퓨샷). 분류 작업, 감정 분석, 카테고리 판별, 형식을 맞춰야 하는 작업, AI가 원하는 형태로 답변하게 만들기.'
    },
    {
        id: 'sec-persona',
        title: '페르소나 패턴 (역할 부여)',
        description: 'AI에게 전문가 역할을 부여하여 특정 관점에서 답변 유도. 전문 분야 상담, 다양한 관점 비교(멀티 페르소나), 코드 리뷰, 계약 검토, 전략 분석, 비평적 피드백. 여행 계획, 건강 상담, 법률 자문, 재무 조언 등 전문가 시뮬레이션.'
    },
    {
        id: 'sec-markdown',
        title: '마크다운을 이용한 구조적 프롬프트',
        description: '헤더, 코드 블럭, 인용문, 목록, 표 등 마크다운 문법으로 프롬프트를 체계적으로 구성. 복잡한 지시사항 전달, 역할+작업+제약+출력 형식을 명확히 구분, 데이터와 지시문 분리, 조건 나열, 보고서 작성 지시.'
    },
    {
        id: 'sec-strength',
        title: '표현 강도와 우선순위 조절',
        description: '지시의 강도(권장→일반→강조→절대)와 우선순위(최우선/중요/선택)를 조절하여 AI 응답 품질 향상. 톤(말투) 변환, 보고서 톤 지정, 글 스타일 변경, 중요도에 따른 조건 설정.'
    },
    {
        id: 'sec-alternatives',
        title: '대안 접근법 패턴',
        description: '하나의 답이 아닌 여러 대안을 비교 분석. 단순 나열형, 축 기반 비교형(비용/속도/확장성 등), 상황별 분기형, 역발상 대안형. 기술 선택, 솔루션 비교, 도구 선택, 방법론 비교, 의사결정 지원.'
    },
    {
        id: 'sec-user-persona',
        title: '이용자 페르소나 패턴',
        description: '답변을 받을 대상(이용자)의 특성을 명시하여 맞춤형 답변 유도. 초보자용 설명, 전문가용 심화 분석, 임원 보고서, 학생용 교재. 독자의 수준/상황/니즈에 따라 같은 정보를 다르게 전달.'
    },
    {
        id: 'sec-recipe',
        title: '레시피 패턴 (단계별 절차)',
        description: '목표 달성을 위한 순서화된 행동 지침. 기본 단계 레시피, 분기 포함 레시피, 체크리스트형. 프로젝트 실행 계획, 업무 절차 정리, 학습 로드맵, 여행 일정 짜기, 요리 레시피, 운동 계획, 이사 준비, 행사 준비 등.'
    },
    {
        id: 'sec-flipped',
        title: '뒤집힌 상호작용 패턴',
        description: 'AI가 먼저 질문하고 사용자가 답하는 방식. 정보가 부족할 때, 맞춤형 결과물이 필요할 때, 제안서/계획서/이력서 작성, 학습 계획 수립. AI의 방대한 지식을 활용해 필요한 정보를 체계적으로 수집.'
    },
    {
        id: 'sec-cognitive',
        title: '인지 검증자 패턴',
        description: '복잡한 질문을 하위 질문으로 분해하여 단계적으로 검증. 의사결정, 타당성 분석, 전략 수립, 기술 검토. 분해→검증→통합으로 정확도 향상.'
    },
    {
        id: 'sec-game',
        title: '게임 플레이 패턴',
        description: '게임 형식으로 학습이나 시뮬레이션 유도. 텍스트 어드벤처, 롤플레이, 스토리텔링, 퀴즈 게임. 어린이 교육, 직원 훈련, 언어 학습, 협상 시뮬레이션.'
    },
    {
        id: 'sec-question-improve',
        title: '질문 개선 패턴',
        description: 'AI가 사용자의 질문을 더 나은 질문으로 업그레이드. 모호한 질문을 명확하게, 잘못된 전제 교정, 다방향 버전 제시. 원하는 답변을 못 받을 때, 질문이 너무 광범위할 때.'
    },
    {
        id: 'sec-factcheck',
        title: '팩트체크 목록 패턴',
        description: '검증이 필요한 항목을 스스로 추출하고 목록화. 신뢰도 점수 부여, 위험도별 분류(🔴🟡🟢). 법률/세금/규정 관련 정보, 수치 데이터, 변경 가능성이 있는 정보 검증.'
    },
    {
        id: 'sec-metalang',
        title: '메타언어 생성 패턴 (단축어)',
        description: '/요약, /코드, /비교 같은 나만의 단축 명령어를 정의하여 반복 작업을 간단하게 실행. 자주 쓰는 지시를 코드화, 일관된 출력 형식 유지.'
    },
    {
        id: 'sec-reflection',
        title: '리플렉션 패턴 (자기성찰)',
        description: 'AI가 초안 작성 → 스스로 비평 → 개선본 출력. 품질 기준 평가(명확성/완결성/정확성/실용성). 보고서, 코드, 이메일, 계획서 등 중요 문서의 품질 향상.'
    },
    {
        id: 'sec-outline',
        title: '아웃라인 확장 패턴',
        description: '큰 주제의 뼈대(아웃라인)를 먼저 잡고 점진적으로 살을 붙이는 방식. 교육 과정 설계, 책 목차 작성, 프로젝트 계획, 강의 스크립트 작성.'
    },
    {
        id: 'sec-context-manager',
        title: '컨텍스트 관리자 패턴',
        description: '대화 전체에 적용되는 상황/목적/제약을 선언하여 일관된 맞춤형 답변 유도. 회사 환경, 기술 수준, 예산 제약을 미리 설정.'
    },
    {
        id: 'sec-infinite-gen',
        title: '무한 생성 패턴',
        description: '고정 프레임과 변수를 정의하여 다양한 조합의 결과물을 반복 생성. 이메일 템플릿, 보고서, 마케팅 문구, 더미 데이터 생성.'
    },
    {
        id: 'sec-5w1h',
        title: '5W1H 프레임워크',
        description: 'Who/What/When/Where/Why/How를 구조적으로 입력하여 체계적인 전략 보고서 생성. 시장 진입 전략, 사업 기획, 컨설팅 보고서.'
    },
    {
        id: 'sec-costar',
        title: 'CO-STAR 프레임워크',
        description: 'Context/Objective/Style/Tone/Audience/Response — 프롬프트 엔지니어링 대회 1등 전략. 비즈니스 제안서, 영업 문서, 마케팅 카피 작성에 최적.'
    },
    {
        id: 'sec-focus',
        title: 'FOCUS 프레임워크',
        description: 'Function/Objective/Context/Utility/Specifications — 바이어 발굴, LinkedIn 메시지, 영업 캠페인, 맞춤형 비즈니스 커뮤니케이션.'
    },
    {
        id: 'sec-roses',
        title: 'ROSES 프레임워크',
        description: 'Role/Objective/Scenario/Expected Solution/Steps — 협상 전략, 분쟁 해결, 단계별 액션 플랜이 필요한 복잡한 비즈니스 상황.'
    },
    {
        id: 'sec-bab',
        title: 'BAB 프레임워크',
        description: 'Before/After/Bridge — 변화 스토리텔링 구조. 성공 사례 작성, 마케팅 스토리, 제안서의 문제→해결→방법 서술.'
    },
    {
        id: 'sec-multi-perspective',
        title: '다중 관점 기법',
        description: '여러 이해관계자/전문 분야/시간 레이어로 동시 분석. 의사결정, 갈등 분석, 전략 수립. 충돌 지점→진짜 문제, 동의 지점→확실한 진실, 보완 지점→완전한 해결책.'
    },
    {
        id: 'sec-cot',
        title: 'CoT 기법 (Chain of Thought)',
        description: '복잡한 문제를 단계별로 추론. 중간 사고 과정을 보여주며 정확도 향상. 의사결정, 수학적 추론, 전략 분석, 논리적 판단이 필요한 모든 작업.'
    },
    {
        id: 'sec-ape',
        title: 'APE — 자동 프롬프트 최적화',
        description: 'AI가 스스로 프롬프트 후보 생성→평가→최적화. 반복 사용할 프롬프트 품질 개선, 코딩 프롬프트 최적화, 이메일/문서 생성 자동화.'
    }
];


// ===== Chapter Navigation (Scroll-based) =====
document.addEventListener('DOMContentLoaded', () => {
    const chapterItems = document.querySelectorAll('.chapter-item');
    // Include intro-page so it's detected by scroll spy
    const chapters = document.querySelectorAll('.chapter, .intro-page');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const searchInput = document.getElementById('search-input');

    // Create overlay for mobile
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // Build sub-navigation from DOM sections
    const chapterSections = {};
    document.querySelectorAll('article[id^="chapter-"]').forEach(article => {
        const chapterId = article.id.replace('chapter-', '');
        const sections = [];
        article.querySelectorAll('section[id]').forEach(sec => {
            const titleEl = sec.querySelector('.section-title h2');
            if (titleEl) {
                sections.push({ id: sec.id, title: titleEl.textContent.trim() });
            }
        });
        chapterSections[chapterId] = sections;
    });

    // Inject sub-lists into sidebar chapter items
    chapterItems.forEach(item => {
        const chapterId = item.dataset.chapter;
        const sections = chapterSections[chapterId] || [];
        if (sections.length === 0) return;

        const subList = document.createElement('ul');
        subList.className = 'chapter-sub-list';
        sections.forEach(sec => {
            const li = document.createElement('li');
            li.className = 'chapter-sub-item';
            li.dataset.sectionId = sec.id;
            li.textContent = sec.title;
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                const target = document.getElementById(sec.id);
                if (target) {
                    const searchBarH = document.getElementById('search-bar')?.offsetHeight || 80;
                    const offset = target.offsetTop - searchBarH - 8;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
                closeSidebar();
            });
            subList.appendChild(li);
        });
        item.appendChild(subList);
    });

    // Flag to pause scroll spy during programmatic scrolling
    let scrollingByClick = false;
    let scrollEndTimer = null;

    function onScrollEnd() {
        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(() => {
            scrollingByClick = false;
            window.removeEventListener('scroll', onScrollEnd);
            updateActiveChapter();
        }, 120);
    }

    // Scroll sidebar to keep active item visible
    function scrollSidebarToActive() {
        const activeSubItem = sidebar.querySelector('.chapter-sub-item.active');
        const activeChapterItem = sidebar.querySelector('.chapter-item.active');
        const target = activeSubItem || activeChapterItem;
        if (!target) return;

        const targetRect = target.getBoundingClientRect();
        const sidebarRect = sidebar.getBoundingClientRect();
        const padding = 24;

        if (targetRect.top < sidebarRect.top + padding) {
            sidebar.scrollBy({ top: targetRect.top - sidebarRect.top - padding, behavior: 'smooth' });
        } else if (targetRect.bottom > sidebarRect.bottom - padding) {
            sidebar.scrollBy({ top: targetRect.bottom - sidebarRect.bottom + padding, behavior: 'smooth' });
        }
    }

    // Click sidebar item -> scroll to that chapter
    chapterItems.forEach(item => {
        item.addEventListener('click', () => {
            // Immediately activate clicked chapter so sub-list opens at once
            chapterItems.forEach(ci => ci.classList.remove('active'));
            item.classList.add('active');
            // Scroll sidebar so sub-list is visible after opening
            setTimeout(scrollSidebarToActive, 50);

            // Pause scroll spy; re-enable only after scroll fully stops
            scrollingByClick = true;
            clearTimeout(scrollEndTimer);
            window.removeEventListener('scroll', onScrollEnd);
            window.addEventListener('scroll', onScrollEnd, { passive: true });

            const chapterId = item.dataset.chapter;
            const target = document.getElementById(`chapter-${chapterId}`);
            if (target) {
                const searchBarH = document.getElementById('search-bar')?.offsetHeight || 80;
                const offset = target.offsetTop - searchBarH - 8;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
            closeSidebar();
        });
    });

    // Scroll spy: chapter + active section
    function updateActiveChapter() {
        if (scrollingByClick) return;

        let currentChapter = null;
        chapters.forEach(ch => {
            const rect = ch.getBoundingClientRect();
            if (rect.top <= 150) {
                currentChapter = ch;
            }
        });

        if (!currentChapter) return;

        const activeId = currentChapter.id.replace('chapter-', '');
        chapterItems.forEach(ci => {
            ci.classList.toggle('active', ci.dataset.chapter === activeId);
        });

        // Update active sub-item
        let currentSection = null;
        currentChapter.querySelectorAll('section[id]').forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= 150) {
                currentSection = sec;
            }
        });

        document.querySelectorAll('.chapter-sub-item').forEach(item => {
            item.classList.toggle('active',
                !!(currentSection && item.dataset.sectionId === currentSection.id)
            );
        });

        scrollSidebarToActive();
    }

    window.addEventListener('scroll', updateActiveChapter, { passive: true });
    updateActiveChapter();

    // Mobile sidebar toggle
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', closeSidebar);

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });

    // Ctrl+Enter in search input → generate
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            aiGenerate();
        }
    });
});

// ===== Unlock Keys =====
function unlockKeys() {
    const keyUnlock = document.getElementById('key-unlock');
    const keysGrid = document.getElementById('keys-grid');
    if (!keyUnlock || !keysGrid) return;

    keyUnlock.classList.add('fade-out');
    setTimeout(() => {
        keyUnlock.style.display = 'none';
        keysGrid.classList.add('revealed');
    }, 380);
}

// ===== Generate Prompt =====
async function aiGenerate() {
    const input = document.getElementById('search-input');
    const status = document.getElementById('search-status');
    const query = input.value.trim();

    if (!query) {
        status.textContent = '업무 내용을 입력해주세요.';
        status.className = 'search-error';
        return;
    }

    const hasLocalKey = typeof OPENAI_API_KEY !== 'undefined' && OPENAI_API_KEY !== 'your-api-key-here';
    const isNetlify = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && !window.location.protocol.startsWith('file');

    if (!hasLocalKey && !isNetlify) {
        status.textContent = 'API 키가 설정되지 않았습니다. js/config.js 파일에 OpenAI API 키를 입력하세요.';
        status.className = 'search-error';
        return;
    }

    // Show popup with loading inside result box
    openGeneratePopup();
    const result = document.getElementById('generate-result');
    result.textContent = '프롬프트를 생성하고 있습니다...';
    result.classList.add('is-loading');

    // Build full pattern knowledge as context
    const allPatterns = SECTION_MAP
        .map(sec => `• ${sec.title}\n  ${sec.description}`)
        .join('\n\n');

    const systemPrompt = `당신은 프롬프트 엔지니어링 전문가입니다.

아래는 다양한 프롬프트 패턴과 기법들입니다:

${allPatterns}

사용자가 요청한 업무에 대해 위 패턴과 기법들을 자유롭게 조합하여, 해당 업무에 가장 효과적인 맞춤형 프롬프트를 생성해주세요.

규칙:
- 업무의 성격과 목표를 분석하여 가장 적합한 패턴 요소들을 자유롭게 결합하세요
- 단순히 패턴 하나를 적용하지 말고, 업무에 진짜 필요한 구조로 통합하세요
- 바로 AI에 붙여넣기 할 수 있는 완성된 프롬프트만 출력하세요
- 설명이나 부가 텍스트 없이 프롬프트 본문만 반환하세요
- 한국어로 작성하세요`;

    const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `다음 업무를 위한 최적의 프롬프트를 생성해주세요: "${query}"` }
    ];

    try {
        let data;

        if (hasLocalKey) {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages,
                    max_tokens: 1200,
                    temperature: 0.7
                })
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error?.message || `API 오류 (${response.status})`);
            }
            data = await response.json();
        } else {
            const response = await fetch('/.netlify/functions/ai-search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages, max_tokens: 1200 })
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || `서버 오류 (${response.status})`);
            }
            data = await response.json();
        }

        const generated = data.choices[0].message.content.trim();
        result.classList.remove('is-loading');
        result.textContent = generated;
        saveToHistory(query, generated);

    } catch (err) {
        console.error('[AI Generate] 오류:', err);
        result.classList.remove('is-loading');
        result.textContent = `오류: ${err.message}`;
    }
}

function openGeneratePopup() {
    document.getElementById('generate-overlay').classList.add('active');
    document.getElementById('generate-popup').classList.add('active');
}

function closeGeneratePopup() {
    document.getElementById('generate-overlay').classList.remove('active');
    document.getElementById('generate-popup').classList.remove('active');
}

function copyGenerated() {
    const text = document.getElementById('generate-result').textContent;
    const btn = document.querySelector('.popup-copy-btn');

    navigator.clipboard.writeText(text).then(() => {
        showPopupCopied(btn);
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showPopupCopied(btn);
        } catch (err) {
            console.error('복사 실패:', err);
        }
        document.body.removeChild(textArea);
    });
}

function showPopupCopied(btn) {
    const original = btn.innerHTML;
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> 완료!`;
    btn.classList.add('copied');
    setTimeout(() => {
        btn.innerHTML = original;
        btn.classList.remove('copied');
    }, 2000);
}

// ===== Copy Code =====
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code');
    const text = code.textContent;

    navigator.clipboard.writeText(text).then(() => {
        showCopied(button);
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showCopied(button);
        } catch (err) {
            console.error('복사 실패:', err);
        }
        document.body.removeChild(textArea);
    });
}

function showCopied(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 6L9 17l-5-5"/>
        </svg>
        완료!
    `;
    button.classList.add('copied');
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove('copied');
    }, 2000);
}

// ===== Prompt History =====
const HISTORY_KEY = 'promptHistory';
const HISTORY_MAX = 10;

function saveToHistory(query, result) {
    const history = getHistory();
    history.unshift({ query, result, date: new Date().toISOString() });
    if (history.length > HISTORY_MAX) history.length = HISTORY_MAX;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function getHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
    catch { return []; }
}

function openHistoryPopup() {
    renderHistory();
    document.getElementById('history-overlay').classList.add('active');
    document.getElementById('history-popup').classList.add('active');
}

function closeHistoryPopup() {
    document.getElementById('history-overlay').classList.remove('active');
    document.getElementById('history-popup').classList.remove('active');
}

function renderHistory() {
    const history = getHistory();
    const list = document.getElementById('history-list');
    const countEl = document.getElementById('history-count');

    countEl.textContent = history.length ? `(${history.length}/${HISTORY_MAX})` : '';

    if (history.length === 0) {
        list.innerHTML = '<p class="history-empty">아직 생성된 프롬프트가 없습니다.</p>';
        return;
    }

    const copyIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;

    list.innerHTML = history.map((item, i) => {
        const d = new Date(item.date);
        const dateStr = `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
        return `
        <div class="history-item">
            <div class="history-item-header">
                <span class="history-query">${escHtml(item.query)}</span>
                <span class="history-date">${dateStr}</span>
            </div>
            <pre class="history-result">${escHtml(item.result)}</pre>
            <button class="history-copy-btn" onclick="copyHistoryItem(${i}, this)">
                ${copyIcon} 복사
            </button>
        </div>`;
    }).join('');
}

function escHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function copyHistoryItem(index, btn) {
    const item = getHistory()[index];
    if (!item) return;

    const doFallback = () => {
        const ta = document.createElement('textarea');
        ta.value = item.result;
        ta.style.cssText = 'position:fixed;left:-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
    };

    const markCopied = () => {
        btn.textContent = '✓ 복사됨';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> 복사`;
            btn.classList.remove('copied');
        }, 1800);
    };

    if (navigator.clipboard) {
        navigator.clipboard.writeText(item.result).then(markCopied).catch(doFallback);
    } else {
        doFallback();
        markCopied();
    }
}
