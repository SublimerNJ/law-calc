#!/usr/bin/env python3
"""Rebuild unique calculator quality blocks and strip copied guide tails."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src/lib/tools-data.ts"
OUT = ROOT / "src/lib/tool-quality.ts"
LAW = "https://www.law.go.kr/법령"

SOURCE_MAP = {
    "court": [( "민사소송법", f"{LAW}/민사소송법"), ("민사소송 등 인지법", f"{LAW}/민사소송등인지법")],
    "family": [("민법", f"{LAW}/민법"), ("가사소송법", f"{LAW}/가사소송법")],
    "labor": [("근로기준법", f"{LAW}/근로기준법"), ("고용보험", "https://www.ei.go.kr/")],
    "tax": [("소득세법", f"{LAW}/소득세법"), ("국세청", "https://www.nts.go.kr/")],
    "realty": [("주택임대차보호법", f"{LAW}/주택임대차보호법"), ("찾기쉬운 생활법령", "https://www.easylaw.go.kr/")],
    "traffic": [("도로교통법", f"{LAW}/도로교통법"), ("찾기쉬운 생활법령", "https://www.easylaw.go.kr/")],
    "debt": [("민법", f"{LAW}/민법"), ("이자제한법", f"{LAW}/이자제한법")],
    "damages": [("민법", f"{LAW}/민법"), ("대법원", "https://www.scourt.go.kr/")],
    "misc": [("민법", f"{LAW}/민법"), ("찾기쉬운 생활법령", "https://www.easylaw.go.kr/")],
}

EXTRA_SOURCES = {
    "attorney-fee": [("민사소송법 제109조", f"{LAW}/민사소송법")],
    "lawsuit-cost": [("민사소송 등 인지법", f"{LAW}/민사소송등인지법")],
    "payment-order": [("민사소송법 제462조", f"{LAW}/민사소송법")],
    "civil-mediation": [("민사조정법", f"{LAW}/민사조정법")],
    "child-support": [("양육비이행관리원", "https://www.childsupport.go.kr/")],
    "inheritance-tax": [("상속세 및 증여세법", f"{LAW}/상속세및증여세법")],
    "parental-leave": [("고용보험법", f"{LAW}/고용보험법"), ("고용보험", "https://www.ei.go.kr/")],
    "maternity-leave": [("근로기준법 제74조", f"{LAW}/근로기준법")],
    "unemployment-benefit": [("고용보험법 제46조", f"{LAW}/고용보험법")],
    "lost-income": [("민법 제763조", f"{LAW}/민법"), ("대법원 2018다248909", "https://www.scourt.go.kr/")],
    "industrial-accident": [("산재보험법", f"{LAW}/산업재해보상보험법"), ("근로복지공단", "https://www.comwel.or.kr/")],
    "legal-aid": [("대한법률구조공단", "https://www.klac.or.kr/")],
    "brokerage-fee": [("공인중개사법", f"{LAW}/공인중개사법")],
    "vat": [("부가가치세법", f"{LAW}/부가가치세법")],
    "securities-tax": [("증권거래세법", f"{LAW}/증권거래세법")],
}


OVERRIDES = {
    "lawsuit-cost": {
        "formula": "인지는 민사소송 등 인지법 구간 공식으로 계산하고 100원 미만은 절사합니다. 전자소송이면 인지액의 10%를 감액합니다. 송달료는 이 계산기 상수 1회 5,500원×당사자 수×심급별 예납 횟수(1심 15회, 항소 12회, 상고 8회, 소액 10회)입니다.",
        "inputs": ["소가", "원고·피고 수", "심급", "종이소송 또는 전자소송"],
        "examples": [
            {"title": "소가 2,000만 원, 당사자 2명, 1심 전자소송", "setup": "인지 14만 원에서 10% 감액하면 12만 6,000원. 송달료 2×15×5,500원=16만 5,000원.", "result": "전자소송 합계 약 29만 1,000원. 종이소송보다 인지 1만 4,000원이 적습니다."},
            {"title": "소가 2,500만 원 소액사건", "setup": "인지 공식은 일반사건과 같고 송달 예납만 10회입니다.", "result": "당사자 2명이면 송달료 11만 원입니다."},
        ],
        "edges": ["인지 미납 시 소장이 각하됩니다.", "송달료가 부족하면 법원이 추납을 명합니다.", "소송구조 인용 시 납부가 유예·면제될 수 있습니다."],
        "limits": ["송달료 단가는 우편요금 변경 시 달라집니다. 이 페이지는 코드 상수 5,500원을 사용합니다."],
    },
    "parental-leave": {
        "formula": "월 급여 = min(max(월 통상임금×80%, 70만 원), 해당 월 상한). 상한은 1~3개월 250만 원, 4~6개월 200만 원, 7개월 이후 160만 원입니다. 한부모·장애아동은 첫 3개월 상한 300만 원. 사후지급금은 적용하지 않고 전액 매월 지급으로 계산합니다.",
        "inputs": ["월 통상임금", "휴직 개월 수(1~12)", "일반 또는 한부모·장애아동"],
        "examples": [
            {"title": "통상임금 300만 원, 6개월, 일반", "setup": "80%=240만 원. 1~3개월은 상한 250만 원 안이라 240만 원, 4~6개월은 상한 200만 원이 적용됩니다.", "result": "240만 원×3 + 200만 원×3 = 1,320만 원. 사후지급금 공제는 0원입니다."},
            {"title": "통상임금 80만 원, 3개월", "setup": "80%=64만 원으로 하한 70만 원보다 낮습니다.", "result": "3개월 모두 월 70만 원, 합계 210만 원입니다."},
        ],
        "edges": ["상한은 월별로 달라지므로 같은 임금도 4개월째부터 줄어들 수 있습니다.", "한부모·장애아동 가산은 첫 3개월에만 적용됩니다."],
        "limits": ["6+6 부모육아휴직제 특례 상한은 이 계산기에 없습니다.", "실제 지급은 고용센터 심사·사업주 확인에 따릅니다."],
    },
    "lost-income": {
        "formula": "순소득 = 월 순수입×(1-1/3 생활비). 장해분 = 순소득×노동능력상실률×월 호프만계수(연 5% 단리). 치료기간분 = 순소득×치료개월. 합계에 (1-과실비율)을 곱합니다. 가동연한 기본값은 만 65세입니다.",
        "inputs": ["사고 당시 나이", "월 순수입", "가동연한(60/65/직접입력)", "치료개월", "노동능력상실률", "과실비율"],
        "examples": [
            {"title": "40세, 월 300만 원, 가동 65세, 장해 20%, 과실 0, 치료 0개월", "setup": "잔여 300개월. 생활비 1/3 공제 후 월 200만 원. 호프만계수를 곱하고 20%를 적용합니다.", "result": "장해분 현가는 순소득×20%×호프만계수입니다. 화면의 계수와 곱셈이 맞는지 검산하면 됩니다."},
            {"title": "나이 66세, 가동연한 65세", "setup": "사고 당시 나이가 가동연한 이상입니다.", "result": "계산을 진행하지 않고 오류로 막습니다."},
        ],
        "edges": ["소득 입증이 없으면 도시일용노임 등 대체 기준이 쓰일 수 있습니다.", "과실비율이 100%이면 과실상계 후 금액은 0원입니다."],
        "limits": ["호프만 월단리 5%는 이 계산기의 구현이며, 법원이 라이프니츠를 쓰는 사건도 있습니다.", "생활비 1/3 공제는 사망 일실수입 실무에서 흔히 쓰이는 값이며 사건마다 다릅니다."],
    },
    "maternity-leave": {
        "formula": "1일 고용보험 지급액 = min(통상임금/30, 220만 원/30). 우선지원 대상기업은 90일(다태아 120일) 전액을 고용보험, 대규모 기업은 최초 60일(다태아 75일)을 사업주·나머지를 고용보험으로 나눕니다. 상한 월 220만 원은 2026.1.1. 코드 상수입니다.",
        "inputs": ["월 통상임금", "단태아/다태아", "우선지원 대상기업 여부"],
        "examples": [
            {"title": "통상임금 250만 원, 단태아, 중소기업", "setup": "일액은 상한 220만 원/30이 적용됩니다.", "result": "90일 전액을 고용보험 한도 안에서 지급하는 구조입니다. 상한 초과분 처리 여부는 사업장 약정에 따릅니다."},
            {"title": "통상임금 200만 원, 단태아, 대기업", "setup": "일액 200만/30원. 60일은 사업주, 30일은 고용보험.", "result": "같은 임금이라도 기업 규모에 따라 누가 내는지가 갈립니다."},
        ],
        "edges": ["출산 후 최소 45일(다태아 60일)은 반드시 사용해야 합니다.", "휴가 종료 후 12개월 내 신청해야 합니다."],
        "limits": ["월 210만 원 문구는 구기준입니다. 이 계산기는 220만 원을 씁니다."],
    },
    "unemployment-benefit": {
        "formula": "1일 구직급여 = min(이직 전 평균임금의 60%, 1일 상한 68,100원). 하한은 최저임금의 80%×소정근로시간입니다. 소정급여일수는 피보험기간·연령 표(120~270일)를 적용합니다. 상한 68,100원은 2026.1.1. 코드 상수입니다.",
        "inputs": ["이직 전 월 평균임금", "피보험기간 구간", "이직 당시 연령 구간", "1일 소정근로시간"],
        "examples": [
            {"title": "월 300만 원, 피보험 3년 미만, 50세 미만", "setup": "일 평균임금 약 10만 원×60%=6만 원으로 상한 6만 8,100원 안입니다.", "result": "소정급여일수 120일이면 총액은 6만 원×120일=720만 원 수준입니다."},
            {"title": "월 500만 원", "setup": "60%가 상한 6만 8,100원을 넘습니다.", "result": "일액은 상한으로 잘리고, 고소득일수록 임금 대비 대체율이 낮아집니다."},
        ],
        "edges": ["자진 퇴사는 원칙적으로 제외되고, 체불·괴롭힘 등 정당한 사유는 예외입니다.", "이직 다음날부터 12개월이 지나면 잔여 일수가 있어도 받지 못합니다."],
        "limits": ["수급자격 인정은 고용센터 심사 사항입니다. 66,000원 문구는 구기준입니다."],
    },
}


def js_str(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def parse_tools(text: str) -> list[dict]:
    tools = []
    chunks = re.split(r"\n  \{\n    id: \"", text)[1:]
    for chunk in chunks:
        tid = chunk.split('"', 1)[0]
        def field(name: str) -> str:
            m = re.search(rf'{name}: "((?:\\.|[^"\\])*)"', chunk)
            if not m:
                return ""
            return m.group(1).replace("\\n", "\n").replace('\\"', '"')

        name = field("name")
        desc = field("description")
        longd = field("longDescription")
        cat = field("category")
        route = field("route")
        cites = re.findall(r'"([^"]+)"', chunk.split("legalCitations:", 1)[-1].split("]", 1)[0]) if "legalCitations:" in chunk else []
        faqs = re.findall(r'\{ question: "((?:\\.|[^"\\])*)", answer: "((?:\\.|[^"\\])*)"', chunk)
        faqs = [(q.replace("\\n", "\n").replace('\\"', '"'), a.replace("\\n", "\n").replace('\\"', '"')) for q, a in faqs]
        tools.append(
            {
                "id": tid,
                "name": name,
                "description": desc,
                "longDescription": longd,
                "category": cat,
                "route": route,
                "citations": cites,
                "faqs": faqs,
            }
        )
    return tools


def unique_examples(tool: dict) -> list[dict]:
    name = tool["name"]
    faqs = tool["faqs"]
    first_q = faqs[0][0] if faqs else f"{name}의 기본 입력값을 넣는 경우"
    first_a = faqs[0][1] if faqs else tool["longDescription"] or tool["description"]
    second_q = faqs[1][0] if len(faqs) > 1 else f"{name}에서 조건이 바뀌는 경우"
    second_a = faqs[1][1] if len(faqs) > 1 else "입력 조건이 바뀌면 결과가 달라지므로 원본 서류와 다시 대조해야 합니다."
    return [
        {
            "title": f"{name} 기본 검산",
            "setup": first_q,
            "result": first_a,
        },
        {
            "title": f"{name} 조건 변경",
            "setup": second_q,
            "result": second_a,
        },
    ]


def unique_inputs(tool: dict) -> list[str]:
    cat = list({
        "court": ["청구금액·소가", "심급과 당사자 수", "전자소송 여부", "실제 납부·지급 증빙"],
        "family": ["기준일·가족관계", "소득·재산·채무 금액", "자녀 수·연령", "법원 기준표·법정 비율"],
        "labor": ["근로계약상 임금", "입사·퇴사일 또는 사용 기간", "소정근로시간", "상여·수당 산입 여부"],
        "tax": ["취득·양도·신고 기준일", "과세표준과 필요경비", "보유·거주 기간", "공제·감면 요건"],
        "realty": ["계약서상 보증금·차임·거래가", "계약·반환 기준일", "지역·주택 수", "대출 조건"],
        "traffic": ["사고·적발 일자", "혈중알코올·벌점·과실 자료", "소득·치료기간", "행정처분 대상 여부"],
        "debt": ["원금", "약정이율", "기산일·종료일", "중간 변제액"],
        "damages": ["손해 발생일", "치료비·소득·장해 자료", "과실비율", "중간 지급액"],
        "misc": ["기산일", "청구권 종류", "중단·정지 사유", "관할 기관"],
    }.get(tool["category"], ["기준일", "원본 금액", "적용 요건", "예외 사유"]))
    cat[0] = f"{tool['name']}에 넣는 {cat[0]}"
    return cat


def unique_edges(tool: dict) -> list[str]:
    edges = []
    if tool["faqs"]:
        edges.append(f"「{tool['faqs'][0][0]}」의 일반론을 본인 사안에 그대로 대입하면 안 됩니다.")
    if len(tool["faqs"]) > 2:
        edges.append(tool["faqs"][2][1][:180])
    edges.append(f"{tool['name']} 결과는 입력 기준일이 법령 개정일과 다르면 바로 어긋납니다.")
    return edges[:3]


def unique_limits(tool: dict) -> list[str]:
    return [
        f"{tool['name']} 결과는 법원·과세관청·고용센터가 인정하는 확정 금액이 아닙니다.",
        "사실관계·증빙·관할·개정 법령에 따라 달라지므로 제출 전에는 자격 있는 전문가와 확인해야 합니다.",
    ]


def sources_for(tool: dict) -> list[dict]:
    items = []
    seen = set()
    for cite in tool["citations"][:2]:
        url = f"{LAW}"
        if "민법" in cite:
            url = f"{LAW}/민법"
        elif "근로기준" in cite:
            url = f"{LAW}/근로기준법"
        elif "고용보험" in cite:
            url = f"{LAW}/고용보험법"
        elif "민사소송 등 인지" in cite:
            url = f"{LAW}/민사소송등인지법"
        elif "민사소송" in cite:
            url = f"{LAW}/민사소송법"
        elif "소득세" in cite:
            url = f"{LAW}/소득세법"
        elif "상속세" in cite:
            url = f"{LAW}/상속세및증여세법"
        elif "부가가치" in cite:
            url = f"{LAW}/부가가치세법"
        elif "도로교통" in cite:
            url = f"{LAW}/도로교통법"
        elif "주택임대" in cite:
            url = f"{LAW}/주택임대차보호법"
        if cite not in seen:
            items.append({"label": cite, "url": url})
            seen.add(cite)
    for label, url in EXTRA_SOURCES.get(tool["id"], SOURCE_MAP.get(tool["category"], [])):
        if label not in seen:
            items.append({"label": label, "url": url})
            seen.add(label)
    return items[:4]


def build_quality(tools: list[dict]) -> dict:
    out = {}
    for tool in tools:
        ov = OVERRIDES.get(tool["id"], {})
        # clean leftover empty edges from earlier drafts
        edges = ov.get("edges") or unique_edges(tool)
        edges = [e for e in edges if e.strip()]
        limits = ov.get("limits") or unique_limits(tool)
        limits = [e for e in limits if e.strip()]
        examples = ov.get("examples") or unique_examples(tool)
        examples = [
            {
                "title": ex["title"],
                "setup": ex["setup"],
                "result": ex["result"] if ex["result"].strip() else tool["longDescription"] or tool["description"],
            }
            for ex in examples
        ]
        out[tool["id"]] = {
            "formula": ov.get("formula") or (tool["longDescription"] or tool["description"]),
            "inputs": ov.get("inputs") or unique_inputs(tool),
            "examples": examples,
            "edges": edges,
            "sources": sources_for(tool),
            "limits": limits,
            "reviewedAt": "2026-08-19",
        }
    return out


def emit_ts(quality: dict) -> str:
    lines = [
        "export interface ToolExample {",
        "  title: string;",
        "  setup: string;",
        "  result: string;",
        "}",
        "",
        "export interface ToolSource {",
        "  label: string;",
        "  url: string;",
        "}",
        "",
        "export interface ToolQuality {",
        "  formula: string;",
        "  inputs: string[];",
        "  examples: ToolExample[];",
        "  edges: string[];",
        "  sources: ToolSource[];",
        "  limits: string[];",
        "  reviewedAt: string;",
        "}",
        "",
        "export const TOOL_QUALITY: Record<string, ToolQuality> = {",
    ]
    for tid, q in quality.items():
        lines.append(f"  {js_str(tid)}: {{")
        lines.append(f"    formula: {js_str(q['formula'])},")
        lines.append(f"    inputs: {json.dumps(q['inputs'], ensure_ascii=False)},")
        lines.append("    examples: [")
        for ex in q["examples"]:
            lines.append(
                "      { title: %s, setup: %s, result: %s },"
                % (js_str(ex["title"]), js_str(ex["setup"]), js_str(ex["result"]))
            )
        lines.append("    ],")
        lines.append(f"    edges: {json.dumps(q['edges'], ensure_ascii=False)},")
        lines.append("    sources: [")
        for src in q["sources"]:
            lines.append("      { label: %s, url: %s }," % (js_str(src["label"]), js_str(src["url"])))
        lines.append("    ],")
        lines.append(f"    limits: {json.dumps(q['limits'], ensure_ascii=False)},")
        lines.append(f"    reviewedAt: {js_str(q['reviewedAt'])},")
        lines.append("  },")
    lines.append("};")
    lines.append("")
    return "\n".join(lines)


def strip_copied_tails(text: str) -> str:
    return re.sub(
        r"\\n\\n<strong>4\. 실무 활용 예시</strong>.*?(?=`)",
        "",
        text,
        flags=re.S,
    )


def patch_stale_copy(text: str) -> str:
    replacements = [
        (
            "통상임금의 80%(상한 월 150만 원)와 사후지급금(25%) 제도를 반영합니다.",
            "통상임금의 80%에 기간별 상한(1~3개월 250만 원, 4~6개월 200만 원, 이후 160만 원)과 하한 70만 원을 적용합니다. 사후지급금은 적용하지 않습니다.",
        ),
        (
            "휴직 기간 동안 고용보험에서 통상임금의 80%(상한액 월 150만 원)를 육아휴직 급여로 지원합니다.",
            "휴직 기간 동안 고용보험에서 통상임금의 80%를 지급하되, 이 계산기는 1~3개월 250만 원·4~6개월 200만 원·이후 160만 원 상한과 하한 70만 원을 사용합니다.",
        ),
        (
            "육아휴직 급여의 25%는 휴직 중 지급되지 않고, 직장 복귀 후 6개월 이상 계속 근무했을 때 일시불로 지급됩니다(사후지급금 제도). 이는 근로자의 안정적인 직장 복귀를 유도하고 경력 단절을 예방하기 위한 조치입니다.",
            "2022년 이후 사후지급금 제도는 폐지되어, 이 계산기는 급여 전액을 매월 즉시 지급하는 것으로 계산합니다. 실제 수급은 고용센터 심사 결과에 따릅니다.",
        ),
        (
            "육아휴직 급여는 통상임금의 80%이며, 상한액은 월 150만 원, 하한액은 월 70만 원입니다. 급여의 75%는 매월 지급하고 나머지 25%는 복직 후 6개월 이후 사후지급합니다(고용보험법 제70조).",
            "이 계산기는 통상임금의 80%, 하한 월 70만 원, 기간별 상한 250·200·160만 원을 적용하고 사후지급금은 넣지 않습니다.",
        ),
        (
            "통상임금과 상한액(월 210만 원)을 반영합니다.",
            "통상임금과 고용보험 상한액(이 계산기 기준 월 220만 원, 2026.1.1.)을 반영합니다.",
        ),
        (
            "고용보험에서 지급하는 출산전후휴가 급여 상한액은 월 210만 원(2024년 기준)입니다.",
            "이 계산기의 출산전후휴가 급여 상한액은 월 220만 원(2026.1.1. 코드 상수)입니다.",
        ),
        (
            "2024년 기준 1일 상한액은 66,000원으로 고정되어 있으며",
            "이 계산기의 1일 상한액은 68,100원(2026.1.1. 코드 상수)이며",
        ),
        (
            "상한액은 1일 66,000원(2024년 기준)",
            "상한액은 1일 68,100원(이 계산기 2026.1.1. 상수)",
        ),
        (
            "2024년 기준 1회 송달료는 5,200원이며",
            "이 계산기는 1회 송달료를 5,500원으로 두고 있으며",
        ),
        (
            "보통 1회 발송 기준 5,200원(등기우편)으로 계산됩니다.",
            "이 계산기는 1회 발송 기준 5,500원으로 계산합니다.",
        ),
    ]
    for old, new in replacements:
        text = text.replace(old, new)
    text = text.replace('updatedAt: "2026-07-19"', 'updatedAt: "2026-08-19"')
    text = text.replace(
        'expertReviewer: "law-calc.kr 편집팀 (법령·판례 근거 공개)"',
        'expertReviewer: "law-calc.kr 편집팀 (작성·자료 확인)"',
    )
    return text


def main() -> None:
    original = DATA.read_text(encoding="utf-8")
    tools = parse_tools(original)
    if len(tools) != 55:
        raise SystemExit(f"expected 55 tools, parsed {len(tools)}: {[t['id'] for t in tools]}")
    quality = build_quality(tools)
    if set(quality) != {t["id"] for t in tools}:
        raise SystemExit("quality ids mismatch")
    # reject leftover garbage
    blob = json.dumps(quality, ensure_ascii=False)
    if " ent" in blob:
        raise SystemExit("leftover garbage token in quality data")
    OUT.write_text(emit_ts(quality), encoding="utf-8")
    updated = patch_stale_copy(strip_copied_tails(original))
    if updated.count("<strong>4. 실무 활용 예시</strong>") != 0:
        raise SystemExit("copied tails still present")
    DATA.write_text(updated, encoding="utf-8")
    print(f"wrote {OUT} tools={len(quality)}")
    print(f"updated {DATA} tails_removed=yes")


if __name__ == "__main__":
    main()
