// ===== Section Map (섹션 설명 기반 매칭) =====
const SECTION_MAP = [
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
        description: '하나의 답이 아닌 여러 대안을 비교 분석. 단순 나열형, 축 기반 비교형(비용/속도/확장성 등), 상황별 분기형, 역발상 대안형. 기술 선택, 솔루션 비교, 도구 선택, 방법론 비교, 의사결정 지원. 여행지 비교, 제품 비교, 학습 방법 비교 등.'
    },
    {
        id: 'sec-user-persona',
        title: '이용자 페르소나 패턴',
        description: '답변을 받을 대상(이용자)의 특성을 명시하여 맞춤형 답변 유도. 초보자용 설명, 전문가용 심화 분석, 임원 보고서, 학생용 교재. 독자의 수준/상황/니즈에 따라 같은 정보를 다르게 전달.'
    },
    {
        id: 'sec-recipe',
        title: '레시피 패턴 (단계별 절차)',
        description: '목표 달성을 위한 순서화된 행동 지침. 기본 단계 레시피, 분기 포함 레시피, 체크리스트형. 프로젝트 실행 계획, 업무 절차 정리, 학습 로드맵, 여행 일정 짜기, 요리 레시피, 운동 계획, 이사 준비, 행사 준비 등 순서가 중요한 모든 작업.'
    },
    {
        id: 'sec-flipped',
        title: '뒤집힌 상호작용 패턴',
        description: 'AI가 먼저 질문하고 사용자가 답하는 방식. 정보가 부족할 때, 맞춤형 결과물이 필요할 때, 제안서/계획서/이력서 작성, 학습 계획 수립. AI의 방대한 지식을 활용해 필요한 정보를 체계적으로 수집.'
    },
    {
        id: 'sec-cognitive',
        title: '인지 검증자 패턴',
        description: '복잡한 질문을 하위 질문으로 분해하여 단계적으로 검증. 의사결정, 타당성 분석, 전략 수립, 기술 검토. 하나의 큰 질문에 바로 답하지 않고 분해→검증→통합으로 정확도 향상.'
    },
    {
        id: 'sec-game',
        title: '게임 플레이 패턴',
        description: '게임 형식으로 학습이나 연습을 유도. 퀴즈, 시뮬레이션, 롤플레이, 시나리오 연습.'
    }
];

// ===== Prompt Examples Index (페이지 로드 시 동적 수집) =====
let promptExamples = [];
let lastSearchResult = null; // Store last search result for generate

function collectPromptExamples() {
    promptExamples = [];
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach((block, index) => {
        const label = block.querySelector('.code-header > span')?.textContent || '';
        const code = block.querySelector('code')?.textContent || '';
        // Find which section this code block belongs to
        const section = block.closest('section');
        const sectionId = section ? section.id : '';
        if (code.trim()) {
            promptExamples.push({
                index,
                label,
                content: code.trim().substring(0, 300),
                element: block,
                sectionId
            });
        }
    });
}

// ===== Chapter Navigation (Scroll-based) =====
document.addEventListener('DOMContentLoaded', () => {
    const chapterItems = document.querySelectorAll('.chapter-item');
    const chapters = document.querySelectorAll('.chapter');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const searchInput = document.getElementById('search-input');

    // Collect all prompt examples from the page
    collectPromptExamples();

    // Create overlay for mobile
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // Click sidebar item -> scroll to that chapter
    chapterItems.forEach(item => {
        item.addEventListener('click', () => {
            const chapterId = item.dataset.chapter;
            const target = document.getElementById(`chapter-${chapterId}`);
            if (target) {
                const offset = target.offsetTop - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
            closeSidebar();
        });
    });

    // Scroll spy
    function updateActiveChapter() {
        let currentChapter = null;
        chapters.forEach(ch => {
            const rect = ch.getBoundingClientRect();
            if (rect.top <= 150) {
                currentChapter = ch;
            }
        });
        if (currentChapter) {
            const id = currentChapter.id.replace('chapter-', '');
            chapterItems.forEach(ci => {
                ci.classList.toggle('active', ci.dataset.chapter === id);
            });
        }
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

    // Enter key in search input
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            aiSearch();
        }
    });
});

// ===== AI Search (섹션 설명 기반 매칭 + 코드 블록 이동) =====
async function aiSearch() {
    const input = document.getElementById('search-input');
    const status = document.getElementById('search-status');
    const query = input.value.trim();

    if (!query) {
        status.textContent = '검색어를 입력해주세요.';
        status.className = 'search-error';
        return;
    }

    // Check if API key is available (local dev) or Netlify Function (production)
    const hasLocalKey = typeof OPENAI_API_KEY !== 'undefined' && OPENAI_API_KEY !== 'your-api-key-here';
    const isNetlify = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && !window.location.protocol.startsWith('file');

    if (!hasLocalKey && !isNetlify) {
        status.textContent = 'API 키가 설정되지 않았습니다. js/config.js 파일에 OpenAI API 키를 입력하세요.';
        status.className = 'search-error';
        return;
    }

    status.textContent = 'AI가 최적의 프롬프트 패턴을 찾고 있습니다...';
    status.className = 'search-loading';

    // Build section description list for AI matching
    const sectionList = SECTION_MAP
        .map((sec, i) => `[${i}] "${sec.title}"\n설명: ${sec.description}`)
        .join('\n---\n');

    const systemPrompt = `당신은 프롬프트 엔지니어링 가이드 도우미입니다.

아래는 프롬프트 패턴/기법 섹션 목록입니다. 각 섹션은 [번호], 제목, 설명으로 구성되어 있습니다.

사용자가 처리하고 싶은 업무나 작업을 설명하면, 아래 섹션 중에서 그 업무에 가장 적합한 프롬프트 패턴의 번호를 골라주세요.

중요한 판단 기준:
- 섹션의 "설명"에 포함된 활용 사례와 사용자의 업무가 얼마나 잘 맞는지 판단하세요
- 예시가 무역 관련이더라도, 프롬프트 패턴 자체는 모든 분야에 적용 가능합니다
- "여행 일정 짜기"는 레시피 패턴(단계별 절차), "제품 비교"는 대안 접근법, "전문가 상담"은 페르소나 패턴 등으로 매칭하세요
- 사용자의 업무 성격(비교, 단계별 절차, 역할극, 분류, 구조화 등)에 맞는 패턴을 추천하세요

반드시 숫자 하나만 반환하세요. 다른 텍스트는 포함하지 마세요.

섹션 목록:
${sectionList}`;

    const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query }
    ];

    try {
        let data;

        if (hasLocalKey) {
            // Local development: call OpenAI directly
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages,
                    max_tokens: 10,
                    temperature: 0
                })
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error?.message || `API 오류 (${response.status})`);
            }
            data = await response.json();
        } else {
            // Production: call Netlify Function (API key is server-side)
            const response = await fetch('/.netlify/functions/ai-search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages })
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || `서버 오류 (${response.status})`);
            }
            data = await response.json();
        }
        const rawAnswer = data.choices[0].message.content.trim();
        console.log('[AI Search] 원본 응답:', rawAnswer);

        // Extract the first number from the response (handles "7", "7번", "[7]", "번호: 7" etc.)
        const numberMatch = rawAnswer.match(/\d+/);
        const matchedIndex = numberMatch ? parseInt(numberMatch[0], 10) : -1;
        console.log('[AI Search] 파싱된 인덱스:', matchedIndex, '/ 섹션 수:', SECTION_MAP.length);

        if (matchedIndex < 0 || matchedIndex >= SECTION_MAP.length) {
            status.textContent = `적합한 프롬프트 패턴을 찾지 못했습니다. (응답: "${rawAnswer}")`;
            status.className = 'search-error';
            return;
        }

        const matchedSection = SECTION_MAP[matchedIndex];

        // Find the first code example within the matched section
        const sectionExamples = promptExamples.filter(ex => ex.sectionId === matchedSection.id);

        let targetEl;
        if (sectionExamples.length > 0) {
            // Scroll to the first code example in the matched section
            targetEl = sectionExamples[0].element;
        } else {
            // Fallback: scroll to the section itself
            targetEl = document.getElementById(matchedSection.id);
        }

        if (!targetEl) {
            status.textContent = '해당 섹션을 찾을 수 없습니다.';
            status.className = 'search-error';
            return;
        }

        // Remove previous highlights
        document.querySelectorAll('.search-highlight-block').forEach(el => {
            el.classList.remove('search-highlight-block');
        });

        // Highlight the target
        targetEl.classList.add('search-highlight-block');
        setTimeout(() => targetEl.classList.remove('search-highlight-block'), 4000);

        // Scroll to the target
        const offset = targetEl.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: offset, behavior: 'smooth' });

        const exampleLabel = sectionExamples.length > 0 ? sectionExamples[0].label : '';
        const exampleContent = sectionExamples.length > 0 ? sectionExamples[0].content : '';
        const labelText = exampleLabel ? ` — "${exampleLabel}"` : '';
        status.innerHTML = `<strong>"${matchedSection.title}"</strong> 패턴을 추천합니다.${labelText}`;
        status.className = 'search-success';

        // Save for generate
        lastSearchResult = {
            query,
            section: matchedSection,
            exampleContent
        };

    } catch (err) {
        console.error('[AI Search] 오류:', err);
        status.textContent = `오류: ${err.message}`;
        status.className = 'search-error';
    }
}

// ===== Generate Prompt =====
async function aiGenerate() {
    const input = document.getElementById('search-input');
    const status = document.getElementById('search-status');
    const query = input.value.trim();

    if (!query) {
        status.textContent = '먼저 검색어를 입력해주세요.';
        status.className = 'search-error';
        return;
    }

    // If no search result yet, run search first then generate
    if (!lastSearchResult || lastSearchResult.query !== query) {
        await aiSearch();
        if (!lastSearchResult || lastSearchResult.query !== query) return;
    }

    const hasLocalKey = typeof OPENAI_API_KEY !== 'undefined' && OPENAI_API_KEY !== 'your-api-key-here';

    // Show popup with loading
    openGeneratePopup();
    const loading = document.getElementById('generate-loading');
    const result = document.getElementById('generate-result');
    loading.style.display = 'block';
    result.textContent = '';

    const generatePrompt = `당신은 프롬프트 엔지니어링 전문가입니다.

사용자가 처리하고 싶은 업무: "${query}"

아래는 이 업무에 적합한 프롬프트 패턴 정보입니다:
- 패턴명: ${lastSearchResult.section.title}
- 패턴 설명: ${lastSearchResult.section.description}
${lastSearchResult.exampleContent ? `- 참고 예시:\n${lastSearchResult.exampleContent}` : ''}

위 패턴의 구조와 접근법을 활용하여, 사용자의 업무("${query}")에 맞는 실용적인 프롬프트를 생성해주세요.

규칙:
- 참고 예시의 구조/패턴만 활용하고, 내용은 사용자의 업무에 맞게 완전히 새로 작성
- 바로 AI에 붙여넣기 할 수 있는 완성된 프롬프트만 출력
- 설명이나 부가 텍스트 없이 프롬프트 본문만 반환
- 한국어로 작성`;

    const messages = [
        { role: 'system', content: generatePrompt },
        { role: 'user', content: `"${query}" 업무를 위한 프롬프트를 생성해주세요.` }
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
                    max_tokens: 1000,
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
                body: JSON.stringify({ messages, max_tokens: 1000 })
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || `서버 오류 (${response.status})`);
            }
            data = await response.json();
        }

        loading.style.display = 'none';
        result.textContent = data.choices[0].message.content.trim();

    } catch (err) {
        console.error('[AI Generate] 오류:', err);
        loading.style.display = 'none';
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
